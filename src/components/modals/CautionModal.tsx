'use client';

import { useState, useEffect } from 'react';
import { X, Shield } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { Button, Input, Select } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type Mode = 'prise' | 'restitution';
type CautionPaymentMode = 'cheque' | 'carte_empreinte' | 'cash';

const MODES_PAIEMENT = [
  { value: 'cheque', label: 'Chèque' },
  { value: 'carte_empreinte', label: 'Empreinte carte' },
  { value: 'cash', label: 'Espèces' },
];

export function CautionModal() {
  const { cautionModalOpen, cautionModalLocationId, closeCautionModal } = useUIStore();
  const qc = useQueryClient();

  const [mode, setMode] = useState<Mode>('prise');
  const [montant, setMontant] = useState('');
  const [modePaiement, setModePaiement] = useState<CautionPaymentMode>('cheque');
  const [referenceDoc, setReferenceDoc] = useState('');
  const [notes, setNotes] = useState('');

  // Charger la location pour connaître la caution existante
  const { data: locationData } = useQuery({
    queryKey: ['location', cautionModalLocationId],
    queryFn: async () => {
      const res = await fetch(`/api/locations/${cautionModalLocationId}`);
      if (!res.ok) throw new Error();
      return res.json();
    },
    enabled: !!cautionModalLocationId && cautionModalOpen,
  });

  const location = locationData?.data;

  useEffect(() => {
    if (cautionModalOpen) {
      setMontant(String(location?.cautionMontant ?? ''));
      setModePaiement((location?.caution?.typePrise as CautionPaymentMode | undefined) ?? 'cheque');
      setReferenceDoc(location?.caution?.referenceDoc ?? '');
      setNotes('');
      // Si caution déjà prise, passer en mode restitution
      if (location?.cautionStatut === 'prise') setMode('restitution');
      else setMode('prise');
    }
  }, [cautionModalOpen, location]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && cautionModalOpen) closeCautionModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [cautionModalOpen, closeCautionModal]);

  const mutation = useMutation({
    mutationFn: async () => {
      const categorie = mode === 'prise' ? 'caution' : 'caution_restitution';
      const trimmedReference = referenceDoc.trim();
      const isCheque = modePaiement === 'cheque';
      const isCardImprint = modePaiement === 'carte_empreinte';
      const normalizedNotes = [
        notes.trim(),
        mode === 'prise' && isCardImprint ? 'Empreinte carte à effectuer à l’agence via TPE.' : '',
      ].filter(Boolean).join(' ').trim();

      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locationId: cautionModalLocationId,
          montant: parseFloat(montant),
          type: modePaiement === 'carte_empreinte' ? 'carte' : modePaiement === 'cash' ? 'especes' : modePaiement,
          typePrise: mode === 'prise' ? modePaiement : undefined,
          categorie,
          reference: mode === 'prise' && isCheque && trimmedReference ? trimmedReference : undefined,
          referenceDoc: mode === 'prise' && isCheque && trimmedReference ? trimmedReference : undefined,
          notes: normalizedNotes || undefined,
          statut: 'effectue',
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? 'Erreur');
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success(mode === 'prise' ? 'Caution enregistrée' : 'Caution restituée');
      qc.invalidateQueries({ queryKey: ['locations'] });
      qc.invalidateQueries({ queryKey: ['location', cautionModalLocationId] });
      closeCautionModal();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  if (!cautionModalOpen) return null;

  const montantNum = parseFloat(montant) || 0;
  const referenceRequired = mode === 'prise' && modePaiement === 'cheque';
  const referenceMissing = referenceRequired && !referenceDoc.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeCautionModal}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-noir-card border border-gold/10 rounded-xl shadow-2xl animate-slide-up">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-gold/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-cream">Gestion de la caution</h2>
              <p className="text-xs text-cream-muted">Location #{cautionModalLocationId?.slice(-6)}</p>
            </div>
          </div>
          <button onClick={closeCautionModal} className="text-cream-muted hover:text-cream transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toggle mode */}
        <div className="flex gap-1 m-6 mb-0 p-1 bg-noir-root rounded-lg">
          {(['prise', 'restitution'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                mode === m
                  ? 'bg-gold text-noir-root'
                  : 'text-cream-muted hover:text-cream'
              }`}
            >
              {m === 'prise' ? 'Prise de caution' : 'Restitution'}
            </button>
          ))}
        </div>

        {/* Corps */}
        <div className="p-6 space-y-4">
          {/* Avertissement caution exclue des finances */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 text-xs text-amber-200">
            ℹ️ La caution n'est <strong>pas comptabilisée</strong> dans les revenus — elle est uniquement tracée.
          </div>

          {/* Montant */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-cream-muted">
              Montant (MAD) * {location?.cautionMontant && <span className="text-gold">— Prévu : {formatCurrency(location.cautionMontant)}</span>}
            </label>
            <Input
              type="number"
              min="1"
              step="0.01"
              placeholder="0.00"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              autoFocus
            />
          </div>

          {/* Mode paiement */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-cream-muted">Mode de prise</label>
            <Select value={modePaiement} onChange={(e) => setModePaiement(e.target.value as CautionPaymentMode)} disabled={mode === 'restitution'}>
              {MODES_PAIEMENT.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </Select>
          </div>

          {/* Numéro de chèque */}
          {modePaiement === 'cheque' && (
            <div className="space-y-1">
              <label className="text-sm font-medium text-cream-muted">Référence chèque</label>
              <Input
                placeholder="Ex: 123456"
                value={referenceDoc}
                onChange={(e) => setReferenceDoc(e.target.value)}
                disabled={mode === 'restitution'}
              />
            </div>
          )}

          {modePaiement === 'carte_empreinte' && mode === 'prise' && (
            <div className="rounded-lg border border-gold/10 bg-gold/5 px-3 py-2 text-xs text-cream-muted">
              Empreinte carte : aucune donnée bancaire n’est stockée ici. L’opération se fait à l’agence via le TPE.
            </div>
          )}

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-cream-muted">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Observations, état du véhicule..."
              className="w-full bg-noir-root border border-gold/10 rounded-lg px-3 py-2 text-sm text-cream placeholder:text-cream-faint focus:outline-none focus:border-gold/40 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Pied */}
        <div className="flex gap-3 p-6 pt-0">
          <Button variant="outline" className="flex-1" onClick={closeCautionModal}>
            Annuler
          </Button>
          <Button
            variant="gold"
            className="flex-1"
            disabled={!montantNum || mutation.isPending || referenceMissing}
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending
              ? 'En cours...'
              : mode === 'prise'
              ? `Encaisser ${montantNum > 0 ? formatCurrency(montantNum) : ''}`
              : `Restituer ${montantNum > 0 ? formatCurrency(montantNum) : ''}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
