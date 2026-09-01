'use client';

import { useState } from 'react';
import { X, Repeat, Search, CheckCircle2 } from 'lucide-react';
import { useUIStore } from '@/stores/uiStore';
import { Button, Input } from '@/components/ui';
import { formatCurrency } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface VehicleItem {
  _id: string;
  marque: string;
  modele: string;
  immatriculation: string;
  kilometrage?: number;
  statut?: string;
  tarifJour?: number;
}

export function SwapVehicleModal() {
  const { swapVehicleModalOpen, swapVehicleLocationId, closeSwapVehicleModal } = useUIStore();
  const qc = useQueryClient();

  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const { data: locationData } = useQuery({
    queryKey: ['location', swapVehicleLocationId],
    queryFn: async () => {
      const res = await fetch(`/api/locations/${swapVehicleLocationId}`);
      if (!res.ok) throw new Error();
      return res.json();
    },
    enabled: !!swapVehicleLocationId && swapVehicleModalOpen,
  });

  const location = locationData?.data as
    | {
        vehicle?: { _id?: string };
        vehicule?: { marque?: string; modele?: string; immatriculation?: string };
        tarifJour?: number;
        montantTotal?: number;
      }
    | undefined;

  const { data: vehiclesData, isLoading: loadingVehicles } = useQuery({
    queryKey: ['vehicles-swap'],
    queryFn: async () => {
      const res = await fetch('/api/vehicles?limit=100');
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur chargement véhicules');
      return payload.data as VehicleItem[];
    },
    enabled: swapVehicleModalOpen,
  });

  const currentVehicleId = String(location?.vehicle?._id ?? location?.vehicule?.immatriculation ?? '');
  const query = search.trim().toLowerCase();
  const candidates = (vehiclesData ?? [])
    .filter((v) => String(v._id) !== currentVehicleId)
    .filter((v) => v.statut !== 'maintenance' && v.statut !== 'loue')
    .filter((v) =>
      !query
        ? true
        : `${v.marque} ${v.modele} ${v.immatriculation}`.toLowerCase().includes(query),
    )
    .sort((a, b) => (a.statut === 'disponible' ? 0 : 1) - (b.statut === 'disponible' ? 0 : 1));

  // Réinitialisation de la sélection à l'ouverture d'une autre location (ajustement pendant le rendu)
  const [resetKey, setResetKey] = useState('');
  if (swapVehicleModalOpen && swapVehicleLocationId && swapVehicleLocationId !== resetKey) {
    setResetKey(swapVehicleLocationId);
    setSearch('');
    setSelectedId('');
  }

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/locations/${swapVehicleLocationId}/vehicule`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId: selectedId }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur changement de véhicule');
      return payload;
    },
    onSuccess: () => {
      toast.success('Véhicule remplacé — le tarif initial est conservé');
      qc.invalidateQueries({ queryKey: ['locations'] });
      qc.invalidateQueries({ queryKey: ['location', swapVehicleLocationId] });
      qc.invalidateQueries({ queryKey: ['vehicles'] });
      qc.invalidateQueries({ queryKey: ['reservations'] });
      closeSwapVehicleModal();
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (!swapVehicleModalOpen) return null;

  const selected = candidates.find((v) => v._id === selectedId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeSwapVehicleModal}
        aria-hidden="true"
      />

      <div className="relative flex max-h-[85vh] w-full max-w-lg flex-col bg-noir-card border border-gold/10 rounded-xl shadow-2xl animate-slide-up">
        {/* En-tête */}
        <div className="flex items-center justify-between p-6 border-b border-gold/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
              <Repeat className="w-5 h-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-cream">Changer de véhicule</h2>
              <p className="text-xs text-cream-muted">
                Actuel : {location?.vehicule?.marque ?? ''} {location?.vehicule?.modele ?? ''} · {location?.vehicule?.immatriculation ?? ''}
              </p>
            </div>
          </div>
          <button onClick={closeSwapVehicleModal} className="text-cream-muted hover:text-cream transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corps */}
        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-3 py-2 text-xs text-emerald-300">
            Le prix de la location reste inchangé : {formatCurrency(location?.tarifJour ?? 0)}/jour · total {formatCurrency(location?.montantTotal ?? 0)}
          </div>

          <Input
            placeholder="Rechercher marque, modèle, immat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />

          <div className="space-y-2">
            {loadingVehicles && <p className="py-4 text-center text-sm text-cream-muted">Chargement des véhicules...</p>}
            {!loadingVehicles && candidates.length === 0 && (
              <p className="py-4 text-center text-sm text-cream-muted">Aucun véhicule disponible trouvé.</p>
            )}
            {candidates.map((v) => (
              <button
                key={v._id}
                type="button"
                onClick={() => setSelectedId(v._id)}
                className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                  selectedId === v._id
                    ? 'border-gold/40 bg-gold/10'
                    : 'border-white/5 bg-white/[0.02] hover:border-gold/20 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-cream">
                      {v.marque} {v.modele}
                    </p>
                    <p className="mt-0.5 text-xs text-cream-muted">
                      {v.immatriculation} · {v.kilometrage?.toLocaleString('fr-FR')} km
                      {v.statut !== 'disponible' ? ` · ${v.statut?.replace('_', ' ')}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gold">{formatCurrency(v.tarifJour ?? 0)}/j</span>
                    {selectedId === v._id && <CheckCircle2 className="h-4 w-4 text-gold" />}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selected && (
            <p className="text-xs text-cream-muted">
              Le km de départ sera réinitialisé à {selected.kilometrage?.toLocaleString('fr-FR')} km (kilométrage du nouveau véhicule).
            </p>
          )}
        </div>

        {/* Pied */}
        <div className="flex gap-3 p-6 pt-4">
          <Button variant="outline" className="flex-1" onClick={closeSwapVehicleModal}>
            Annuler
          </Button>
          <Button
            variant="gold"
            className="flex-1"
            disabled={!selectedId || mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending ? 'Remplacement...' : 'Remplacer le véhicule'}
          </Button>
        </div>
      </div>
    </div>
  );
}
