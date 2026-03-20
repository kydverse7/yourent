'use client';

import { useState, useEffect } from 'react';
import { X, CreditCard } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { Button, Input, Select } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const CATEGORIES = [
  { value: 'location', label: 'Location' },
  { value: 'supplement', label: 'Supplément' },
  { value: 'remise', label: 'Remise / ajustement' },
  { value: 'autre', label: 'Autre' },
];

const MODES_PAIEMENT = [
  { value: 'especes', label: 'Espèces' },
  { value: 'virement', label: 'Virement' },
  { value: 'cheque', label: 'Chèque' },
  { value: 'carte', label: 'Carte bancaire' },
];

export function QuickPayModal() {
  const { quickPayModalOpen, quickPayTarget, closeQuickPayModal } = useUIStore();
  const qc = useQueryClient();

  const [montant, setMontant] = useState('');
  const [mode, setMode] = useState('especes');
  const [categorie, setCategorie] = useState('location');
  const [notes, setNotes] = useState('');

  // Reset à l'ouverture
  useEffect(() => {
    if (quickPayModalOpen) {
      setMontant('');
      setMode('especes');
      setCategorie('location');
      setNotes('');
    }
  }, [quickPayModalOpen]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && quickPayModalOpen) closeQuickPayModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [quickPayModalOpen, closeQuickPayModal]);

  const { data: targetData } = useQuery({
    queryKey: ['quick-pay-target', quickPayTarget?.type, quickPayTarget?.id],
    queryFn: async () => {
      if (!quickPayTarget) return null;
      const endpoint = quickPayTarget.type === 'location'
        ? `/api/locations/${quickPayTarget.id}`
        : `/api/reservations/${quickPayTarget.id}`;
      const res = await fetch(endpoint);
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur chargement dossier');
      return payload.data;
    },
    enabled: !!quickPayTarget && quickPayModalOpen,
  });

  const montantTotal = Number(targetData?.montantTotal ?? targetData?.prix?.totalEstime ?? 0);
  const montantPaye = Number(targetData?.montantPaye ?? 0);
  const montantRestant = Math.max(0, Number(targetData?.montantRestant ?? montantTotal - montantPaye));
  const dossierLabel = quickPayTarget?.type === 'location'
    ? `Location #${quickPayTarget.id.slice(-6)}`
    : quickPayTarget?.type === 'reservation'
      ? `Réservation #${quickPayTarget.id.slice(-6)}`
      : 'Paiement';

  useEffect(() => {
    if (quickPayModalOpen && montantRestant > 0) {
      setMontant(String(montantRestant));
      setCategorie('location');
    }
  }, [quickPayModalOpen, montantRestant]);

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(quickPayTarget?.type === 'location' ? { locationId: quickPayTarget.id } : {}),
          ...(quickPayTarget?.type === 'reservation' ? { reservationId: quickPayTarget.id } : {}),
          montant: parseFloat(montant),
          type: mode,
          categorie,
          notes,
          statut: 'effectue',
        }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? 'Erreur paiement');
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success('Paiement enregistré');
      qc.invalidateQueries({ queryKey: ['locations'] });
      qc.invalidateQueries({ queryKey: ['location', quickPayTarget?.id] });
      qc.invalidateQueries({ queryKey: ['reservations'] });
      qc.invalidateQueries({ queryKey: ['reservation', quickPayTarget?.id] });
      qc.invalidateQueries({ queryKey: ['finances'] });
      qc.invalidateQueries({ queryKey: ['payments'] });
      closeQuickPayModal();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  if (!quickPayModalOpen) return null;

  const montantNum = parseFloat(montant) || 0;
  const maxPayable = categorie === 'location' ? montantRestant : undefined;
  const paymentExceedsBalance = typeof maxPayable === 'number' && maxPayable > 0 && montantNum > maxPayable;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeQuickPayModal}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-noir-card border border-gold/10 rounded-xl shadow-2xl animate-slide-up">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-gold/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-cream">Enregistrer un paiement</h2>
              <p className="text-xs text-cream-muted">{dossierLabel}</p>
            </div>
          </div>
          <button onClick={closeQuickPayModal} className="text-cream-muted hover:text-cream transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-gold/10 bg-gold/5 p-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-cream-faint">Total</p>
              <p className="mt-1 text-sm font-semibold text-cream">{formatCurrency(montantTotal)}</p>
            </div>
            <div className="rounded-xl border border-green-500/15 bg-green-500/5 p-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-cream-faint">Encaissé</p>
              <p className="mt-1 text-sm font-semibold text-green-300">{formatCurrency(montantPaye)}</p>
            </div>
            <div className="rounded-xl border border-amber-500/15 bg-amber-500/5 p-3">
              <p className="text-[11px] uppercase tracking-[0.14em] text-cream-faint">Reste</p>
              <p className="mt-1 text-sm font-semibold text-amber-300">{formatCurrency(montantRestant)}</p>
            </div>
          </div>

          {/* Montant */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-cream-muted">Montant (MAD) *</label>
            <Input
              type="number"
              min="1"
              max={categorie === 'location' && montantRestant > 0 ? String(montantRestant) : undefined}
              step="0.01"
              placeholder="0.00"
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              className="text-lg font-semibold"
              autoFocus
            />
            {montantNum > 0 && (
              <p className="text-xs text-gold">{formatCurrency(montantNum)}</p>
            )}
            {paymentExceedsBalance && (
              <p className="text-xs text-red-300">Le montant dépasse le reste à payer sur ce dossier.</p>
            )}
          </div>

          {/* Catégorie + Mode */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium text-cream-muted">Catégorie</label>
              <Select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-cream-muted">Mode de paiement</label>
              <Select value={mode} onChange={(e) => setMode(e.target.value)}>
                {MODES_PAIEMENT.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </Select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-cream-muted">Notes (optionnel)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Référence, numéro de chèque..."
              className="w-full bg-noir-root border border-gold/10 rounded-lg px-3 py-2 text-sm text-cream placeholder:text-cream-faint focus:outline-none focus:border-gold/40 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Pied */}
        <div className="flex gap-3 p-6 pt-0">
          <Button variant="outline" className="flex-1" onClick={closeQuickPayModal}>
            Annuler
          </Button>
          <Button
            variant="gold"
            className="flex-1"
            disabled={!montantNum || montantNum <= 0 || mutation.isPending || paymentExceedsBalance}
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending ? 'Enregistrement...' : `Payer ${montantNum > 0 ? formatCurrency(montantNum) : ''}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
