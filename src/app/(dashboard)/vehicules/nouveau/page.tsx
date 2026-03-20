'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { Button, Input, Select } from '@/components/ui';
import toast from 'react-hot-toast';

interface VehicleCreateForm {
  marque: string;
  modele: string;
  annee: number;
  immatriculation: string;
  type: string;
  carburant: string;
  transmission: string;
  places: number;
  tarifJour: number;
  tarifJour10Plus: number;
  cautionMontant: number;
  couleur: string;
}

const DEFAULTS: VehicleCreateForm = {
  marque: '',
  modele: '',
  annee: new Date().getFullYear(),
  immatriculation: '',
  type: 'berline',
  carburant: 'essence',
  transmission: 'manuelle',
  places: 5,
  tarifJour: 0,
  tarifJour10Plus: 0,
  cautionMontant: 2000,
  couleur: '',
};

export default function NouveauVehiculePage() {
  const router = useRouter();
  const qc = useQueryClient();
  const [form, setForm] = useState<VehicleCreateForm>(DEFAULTS);
  const [errors, setErrors] = useState<Partial<Record<keyof VehicleCreateForm, string>>>({});

  const set = (f: Partial<VehicleCreateForm>) => setForm((p) => ({ ...p, ...f }));

  const validate = () => {
    const e: typeof errors = {};
    if (!form.marque.trim()) e.marque = 'Requis';
    if (!form.modele.trim()) e.modele = 'Requis';
    if (!form.immatriculation.trim()) e.immatriculation = 'Requis';
    if (form.tarifJour <= 0) e.tarifJour = 'Doit être > 0';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const mutation = useMutation({
    mutationFn: async (data: VehicleCreateForm) => {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? 'Erreur création');
      }
      return res.json();
    },
    onSuccess: (d) => {
      toast.success('Véhicule créé');
      qc.invalidateQueries({ queryKey: ['vehicles'] });
      router.push(`/vehicules/${d.data._id}`);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) mutation.mutate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/vehicules">
          <button type="button" className="p-2 rounded-lg text-cream-muted hover:text-cream hover:bg-gold/5 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-cream">Nouveau véhicule</h1>
          <p className="text-sm text-cream-muted">Remplissez les informations du véhicule</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Infos de base */}
        <section className="bg-noir-card border border-gold/10 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gold uppercase tracking-wider">Informations</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Marque *</label>
              <Input value={form.marque} onChange={(e) => set({ marque: e.target.value })} error={errors.marque} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Modèle *</label>
              <Input value={form.modele} onChange={(e) => set({ modele: e.target.value })} error={errors.modele} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Année</label>
              <Input type="number" min={2000} max={2030} value={String(form.annee)} onChange={(e) => set({ annee: parseInt(e.target.value) })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Immatriculation *</label>
              <Input value={form.immatriculation} onChange={(e) => set({ immatriculation: e.target.value.toUpperCase() })} error={errors.immatriculation} placeholder="12345-A-1" />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Couleur</label>
              <Input value={form.couleur} onChange={(e) => set({ couleur: e.target.value })} placeholder="Blanc, Noir..." />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Places</label>
              <Input type="number" min={1} max={9} value={String(form.places)} onChange={(e) => set({ places: parseInt(e.target.value) })} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Type</label>
              <Select value={form.type} onChange={(e) => set({ type: e.target.value })}>
                {['economique', 'berline', 'suv', 'premium', 'utilitaire'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Carburant</label>
              <Select value={form.carburant} onChange={(e) => set({ carburant: e.target.value })}>
                {['essence', 'diesel', 'hybride', 'electrique'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Transmission</label>
              <Select value={form.transmission} onChange={(e) => set({ transmission: e.target.value })}>
                <option value="manuelle">Manuelle</option>
                <option value="automatique">Automatique</option>
              </Select>
            </div>
          </div>
        </section>

        {/* Tarifs */}
        <section className="bg-noir-card border border-gold/10 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gold uppercase tracking-wider">Tarification</h2>
          <p className="text-xs text-cream-muted">Minimum de location : 3 jours. Le tarif 11+ jours est optionnel ; sinon le tarif de base s&apos;applique.</p>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Tarif / jour (MAD) *</label>
              <Input type="number" min={0} step={10} value={String(form.tarifJour)} onChange={(e) => set({ tarifJour: Number(e.target.value || 0) })} error={errors.tarifJour} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Tarif 11+ jours (MAD)</label>
              <Input type="number" min={0} step={10} value={String(form.tarifJour10Plus)} onChange={(e) => set({ tarifJour10Plus: Number(e.target.value || 0) })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Caution (MAD)</label>
              <Input type="number" min={0} step={100} value={String(form.cautionMontant)} onChange={(e) => set({ cautionMontant: Number(e.target.value || 0) })} />
            </div>
          </div>
        </section>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pb-6">
        <Link href="/vehicules">
          <Button type="button" variant="outline">Annuler</Button>
        </Link>
        <Button type="submit" variant="gold" disabled={mutation.isPending}>
          <Save className="w-4 h-4 mr-2" />
          {mutation.isPending ? 'Création...' : 'Créer le véhicule'}
        </Button>
      </div>
    </form>
  );
}
