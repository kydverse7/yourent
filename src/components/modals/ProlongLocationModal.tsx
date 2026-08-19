'use client';

import { useState, useEffect } from 'react';
import { X, CalendarClock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { useUIStore } from '@/stores/uiStore';
import { Button, Input } from '@/components/ui';
import { formatCurrency, formatDateTime, calcNbJours, calcTarifTotal, resolveVehiclePricing } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function ProlongLocationModal() {
  const { prolongModalOpen, prolongLocationId, closeProlongModal } = useUIStore();
  const qc = useQueryClient();

  const [nouvelleFin, setNouvelleFin] = useState('');
  const [raison, setRaison] = useState('');
  const [conflitWarning, setConflitWarning] = useState<string | null>(null);

  const { data: locationData } = useQuery({
    queryKey: ['location', prolongLocationId],
    queryFn: async () => {
      const res = await fetch(`/api/locations/${prolongLocationId}`);
      if (!res.ok) throw new Error();
      return res.json();
    },
    enabled: !!prolongLocationId && prolongModalOpen,
  });

  const location = locationData?.data;

  // Réinitialisation du formulaire quand la location (ou sa fin prévue) change — sans effet
  const [resetKey, setResetKey] = useState('');
  const locationKey =
    prolongLocationId && location?.finPrevueAt
      ? `${prolongLocationId}:${String(location.finPrevueAt)}`
      : '';
  if (prolongModalOpen && locationKey && locationKey !== resetKey) {
    setResetKey(locationKey);
    setNouvelleFin(format(new Date(location.finPrevueAt), "yyyy-MM-dd'T'HH:mm"));
    setRaison('');
    setConflitWarning(null);
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && prolongModalOpen) closeProlongModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prolongModalOpen, closeProlongModal]);

  const mutation = useMutation({
    mutationFn: async ({ forcer }: { forcer: boolean }) => {
      const res = await fetch(`/api/locations/${prolongLocationId}/prolong`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nouvelleFin: new Date(nouvelleFin).toISOString(),
          ...(raison.trim() ? { raison: raison.trim() } : {}),
          forcerConflit: forcer,
        }),
      });
      const payload = await res.json();
      if (!res.ok) {
        const err = new Error(payload.error ?? 'Erreur prolongation') as Error & { status?: number };
        err.status = res.status;
        throw err;
      }
      return payload;
    },
    onSuccess: (payload) => {
      const jours = payload?.data?.joursSupplementaires ?? 0;
      const montant = payload?.data?.montantSup ?? 0;
      toast.success(jours > 0 ? `Location prolongée de ${jours} jour${jours > 1 ? 's' : ''} (+${formatCurrency(montant)})` : 'Location prolongée');
      qc.invalidateQueries({ queryKey: ['locations'] });
      qc.invalidateQueries({ queryKey: ['location', prolongLocationId] });
      qc.invalidateQueries({ queryKey: ['vehicles'] });
      closeProlongModal();
    },
    onError: (err: Error & { status?: number }) => {
      if (err.status === 409) {
        setConflitWarning(err.message);
      } else {
        toast.error(err.message);
      }
    },
  });

  if (!prolongModalOpen) return null;

  const ancienneFin = location?.finPrevueAt ? new Date(location.finPrevueAt) : null;
  const nouvelleFinDate = nouvelleFin ? new Date(nouvelleFin) : null;
  const valide =
    !!ancienneFin &&
    !!nouvelleFinDate &&
    !Number.isNaN(nouvelleFinDate.getTime()) &&
    nouvelleFinDate.getTime() > ancienneFin.getTime();

  // Aperçu tarifaire côté client (le serveur recalcule de façon autoritaire)
  let preview: {
    joursSup: number;
    tarifJour: number;
    nouveauTotal: number;
    supplement: number;
  } | null = null;

  if (valide && location) {
    const nbJoursNouveau = calcNbJours(new Date(location.debutAt), nouvelleFinDate!);
    const { tarifJour, tarifJour10Plus } = resolveVehiclePricing(location.vehicule ?? location.vehicle);
    const pricing = calcTarifTotal(nbJoursNouveau, tarifJour, tarifJour10Plus, {
      forceStandard: location.highSeason === true,
    });
    const nouveauTotal = Math.max(0, pricing.total + Number(location.optionsTotal ?? 0) - Number(location.remise ?? 0));
    preview = {
      joursSup: Math.max(0, nbJoursNouveau - Number(location.nbJours ?? 0)),
      tarifJour: pricing.tarifJour,
      nouveauTotal,
      supplement: Math.max(0, nouveauTotal - Number(location.montantTotal ?? 0)),
    };
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeProlongModal}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-noir-card border border-gold/10 rounded-xl shadow-2xl animate-slide-up">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-gold/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <CalendarClock className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-cream">Prolonger la location</h2>
              <p className="text-xs text-cream-muted">
                {location?.vehicule?.marque ?? ''} {location?.vehicule?.modele ?? ''} · {location?.client?.prenom ?? ''} {location?.client?.nom ?? ''}
              </p>
            </div>
          </div>
          <button onClick={closeProlongModal} className="text-cream-muted hover:text-cream transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps */}
        <div className="p-6 space-y-4">
          {ancienneFin && ancienneFin < new Date() && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-xs text-red-300">
              Cette location est en retard (fin prévue le {formatDateTime(ancienneFin)}). Une prolongation la fera repasser à jour.
            </div>
          )}

          <div className="lux-panel-muted rounded-lg px-3 py-2 text-xs text-cream-muted">
            Fin prévue actuelle : <span className="text-cream font-medium">{ancienneFin ? formatDateTime(ancienneFin) : '—'}</span>
          </div>

          {/* Nouvelle date de fin */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-cream-muted">Nouvelle date de fin *</label>
            <Input
              type="datetime-local"
              value={nouvelleFin}
              min={ancienneFin ? format(ancienneFin, "yyyy-MM-dd'T'HH:mm") : undefined}
              onChange={(e) => {
                setNouvelleFin(e.target.value);
                setConflitWarning(null);
              }}
              autoFocus
            />
          </div>

          {/* Raison */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-cream-muted">Raison (optionnel)</label>
            <textarea
              value={raison}
              onChange={(e) => setRaison(e.target.value)}
              rows={2}
              placeholder="Ex : client souhaite garder le véhicule quelques jours de plus..."
              className="w-full bg-noir-root border border-gold/10 rounded-lg px-3 py-2 text-sm text-cream placeholder:text-cream-faint focus:outline-none focus:border-gold/40 transition-colors resize-none"
            />
          </div>

          {/* Aperçu tarifaire */}
          {preview && (
            <div className="lux-panel-muted rounded-lg p-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-cream-muted">Jours supplémentaires</span>
                <span className="font-medium text-cream">+{preview.joursSup} jour{preview.joursSup > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream-muted">Tarif / jour {location?.palier === 'standard' && preview.tarifJour !== Number(location.tarifJour ?? 0) ? '(palier 10+ jours appliqué)' : ''}</span>
                <span className="font-medium text-gold">{formatCurrency(preview.tarifJour)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-cream-muted">Nouveau montant total</span>
                <span className="font-medium text-cream">{formatCurrency(preview.nouveauTotal)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-gold/10 pt-2">
                <span className="text-cream-muted">Supplément à encaisser</span>
                <span className="font-semibold text-amber-300">{formatCurrency(preview.supplement)}</span>
              </div>
            </div>
          )}

          {/* Avertissement conflit planning */}
          {conflitWarning && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 text-xs text-amber-200 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                <p>{conflitWarning}</p>
              </div>
            </div>
          )}
        </div>

        {/* Pied */}
        <div className="flex gap-3 p-6 pt-0">
          <Button variant="outline" className="flex-1" onClick={closeProlongModal}>
            Annuler
          </Button>
          <Button
            variant={conflitWarning ? 'secondary' : 'gold'}
            className="flex-1"
            disabled={!valide || mutation.isPending}
            onClick={() => mutation.mutate({ forcer: !!conflitWarning })}
          >
            {mutation.isPending
              ? 'En cours...'
              : conflitWarning
                ? 'Prolonger quand même'
                : 'Prolonger'}
          </Button>
        </div>
      </div>
    </div>
  );
}
