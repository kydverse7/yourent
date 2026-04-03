'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Star, Trash2, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { Button, Input, Select, Badge, Skeleton } from '@/components/ui';
import { formatCurrency, getAlertSeverity } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';
import toast from 'react-hot-toast';
import { use } from 'react';

interface VehicleForm {
  marque: string;
  modele: string;
  annee: number;
  immatriculation: string;
  type: string;
  statut: string;
  carburant: string;
  transmission: string;
  places: number;
  tarifJour: number;
  tarifJour10Plus: number;
  cautionMontant: number;
  couleur: string;
  kilometrage: number;
  afficheSurSite: boolean;
  description: string;
  assuranceExpireAt: string;
  ctExpireAt: string;
  vidangeKm: number;
  nextCtAt: string;
  photos: string[];
  backgroundPhoto: string;
  photoModele: string;
}

function isEmpty(v: unknown) {
  return v === undefined || v === null || v === '';
}

export default function VehiculeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const qc = useQueryClient();
  const openConfirmModal = useUIStore((s) => s.openConfirmModal);

  const { data, isLoading } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      const res = await fetch(`/api/vehicles/${id}`);
      if (!res.ok) throw new Error('Véhicule introuvable');
      return res.json();
    },
    initialData: () => {
      const cachedLists = qc.getQueriesData<{ data?: { groups?: Array<{ vehicles?: Array<Record<string, unknown>> }> } }>({
        queryKey: ['vehicles-grouped'],
      });

      for (const [, cached] of cachedLists) {
        const groups = cached?.data?.groups;
        if (!groups) continue;

        for (const group of groups) {
          const vehicle = group.vehicles?.find((item) => String(item._id) === id);
          if (vehicle) return { data: vehicle };
        }
      }

      return undefined;
    },
    staleTime: 30_000,
  });

  const vehicle = data?.data;

  const [form, setForm] = useState<Partial<VehicleForm>>({});
  const [dirty, setDirty] = useState(false);

  const update = (f: Partial<VehicleForm>) => {
    setForm((prev) => ({ ...prev, ...f }));
    setDirty(true);
  };

  const val = (key: keyof VehicleForm) => {
    if (key in form) return (form as Record<string, unknown>)[key];
    return vehicle?.[key] ?? '';
  };

  const dateInputValue = (key: 'ctExpireAt' | 'assuranceExpireAt') => {
    const value = val(key);
    if (!value) return '';
    return new Date(String(value)).toISOString().split('T')[0];
  };

  const saveMutation = useMutation({
    mutationFn: async (data: Partial<VehicleForm>) => {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? 'Erreur lors de la sauvegarde');
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success('Véhicule mis à jour');
      qc.invalidateQueries({ queryKey: ['vehicles'] });
      qc.invalidateQueries({ queryKey: ['vehicle', id] });
      setDirty(false);
      setForm({});
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? 'Erreur');
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success('Véhicule archivé');
      qc.invalidateQueries({ queryKey: ['vehicles'] });
      router.push('/vehicules');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center py-20">
        <p className="text-cream-muted">Véhicule introuvable</p>
        <Link href="/vehicules">
          <Button variant="outline" className="mt-4">← Retour</Button>
        </Link>
      </div>
    );
  }

  const ctSeverity = getAlertSeverity(vehicle.ctExpireAt);
  const assSeverity = getAlertSeverity(vehicle.assuranceExpireAt);
  const photos = Array.from(new Set(((form.photos ?? vehicle.photos ?? []) as string[]).filter(Boolean))) as string[];
  const featuredPhoto = String(form.backgroundPhoto ?? vehicle.backgroundPhoto ?? photos[0] ?? '');

  const applyPhotos = (nextPhotos: string[], nextFeaturedPhoto?: string) => {
    const uniquePhotos = Array.from(new Set(nextPhotos.filter(Boolean))) as string[];
    const resolvedFeaturedPhoto = nextFeaturedPhoto && uniquePhotos.includes(nextFeaturedPhoto)
      ? nextFeaturedPhoto
      : uniquePhotos[0] ?? '';

    update({
      photos: uniquePhotos,
      backgroundPhoto: resolvedFeaturedPhoto,
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/vehicules">
            <button className="p-2 rounded-lg text-cream-muted hover:text-cream hover:bg-gold/5 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-cream">{vehicle.marque} {vehicle.modele}</h1>
            <p className="text-sm text-cream-muted">{vehicle.immatriculation} · {vehicle.annee}</p>
          </div>
          <Badge variant={vehicle.statut === 'disponible' ? 'green' : vehicle.statut === 'loue' ? 'blue' : 'amber'}>
            {vehicle.statut}
          </Badge>
        </div>
        <div className="flex gap-2">
          {dirty && (
            <Button
              variant="gold"
              onClick={() => saveMutation.mutate(form)}
              disabled={saveMutation.isPending}
            >
              <Save className="w-4 h-4 mr-2" />
              {saveMutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          )}
          <Button
            variant="ghost"
            className="text-red-400 hover:bg-red-500/10"
            onClick={() =>
              openConfirmModal({
                title: 'Archiver ce véhicule ?',
                description: `${vehicle.marque} ${vehicle.modele} sera masqué du système.`,
                onConfirm: () => deleteMutation.mutate(),
              })
            }
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Alertes */}
      {(ctSeverity !== 'ok' || assSeverity !== 'ok') && (
        <div className="flex gap-3 flex-wrap">
          {ctSeverity !== 'ok' && (
            <div className={`px-3 py-2 rounded-lg text-xs border ${ctSeverity === 'depasse' ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'}`}>
              ⚠️ CT {ctSeverity === 'depasse' ? 'expiré' : 'expire bientôt'} — {vehicle.ctExpireAt ? new Date(vehicle.ctExpireAt).toLocaleDateString('fr-MA') : 'N/A'}
            </div>
          )}
          {assSeverity !== 'ok' && (
            <div className={`px-3 py-2 rounded-lg text-xs border ${assSeverity === 'depasse' ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-amber-500/10 border-amber-500/30 text-amber-300'}`}>
              ⚠️ Assurance {assSeverity === 'depasse' ? 'expirée' : 'expire bientôt'} — {vehicle.assuranceExpireAt ? new Date(vehicle.assuranceExpireAt).toLocaleDateString('fr-MA') : 'N/A'}
            </div>
          )}
        </div>
      )}

      {/* Formulaire */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Infos de base */}
        <section className="bg-noir-card border border-gold/10 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gold uppercase tracking-wider">Informations générales</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Marque</label>
              <Input value={String(val('marque'))} onChange={(e) => update({ marque: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Modèle</label>
              <Input value={String(val('modele'))} onChange={(e) => update({ modele: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Année</label>
              <Input type="number" value={String(val('annee'))} onChange={(e) => update({ annee: parseInt(e.target.value) })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Immatriculation</label>
              <Input value={String(val('immatriculation'))} onChange={(e) => update({ immatriculation: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Type</label>
              <Select value={String(val('type'))} onChange={(e) => update({ type: e.target.value })}>
                {['economique', 'berline', 'suv', 'premium', 'utilitaire'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Statut</label>
              <Select value={String(val('statut'))} onChange={(e) => update({ statut: e.target.value })}>
                {['disponible', 'loue', 'maintenance', 'reserve'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Couleur</label>
              <Input value={String(val('couleur') || '')} onChange={(e) => update({ couleur: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Kilométrage</label>
              <Input type="number" value={String(val('kilometrage') || 0)} onChange={(e) => update({ kilometrage: parseInt(e.target.value) })} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Carburant</label>
              <Select value={String(val('carburant'))} onChange={(e) => update({ carburant: e.target.value })}>
                {['essence', 'diesel', 'hybride', 'electrique'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Transmission</label>
              <Select value={String(val('transmission'))} onChange={(e) => update({ transmission: e.target.value })}>
                <option value="manuelle">Manuelle</option>
                <option value="automatique">Automatique</option>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-cream-muted">Places</label>
            <Input type="number" min={1} max={9} value={String(val('places'))} onChange={(e) => update({ places: parseInt(e.target.value) })} />
          </div>
        </section>

        {/* Tarifs */}
        <section className="bg-noir-card border border-gold/10 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gold uppercase tracking-wider">Tarifs & Caution</h2>
          <p className="text-xs text-cream-muted">Minimum de location : 3 jours. Le tarif 11+ jours s&apos;applique automatiquement pour les locations de plus de 10 jours.</p>
          <div className="space-y-3">
            {[
              { key: 'tarifJour', label: 'Tarif / jour (MAD)' },
              { key: 'tarifJour10Plus', label: 'Tarif 11+ jours' },
              { key: 'cautionMontant', label: 'Caution (MAD)' },
            ].map(({ key, label }) => (
              <div key={key} className="space-y-1">
                <label className="text-xs text-cream-muted">{label}</label>
                <div className="relative">
                  <Input
                    type="number"
                    min={0}
                    step={10}
                    value={String(val(key as keyof VehicleForm) || 0)}
                    onChange={(e) => update({ [key]: parseFloat(e.target.value) } as Partial<VehicleForm>)}
                  />
                  {!isEmpty(val(key as keyof VehicleForm)) && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gold pointer-events-none">
                      {formatCurrency(parseFloat(String(val(key as keyof VehicleForm))) || 0)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div className="pt-2 border-t border-gold/10 space-y-3">
            <h3 className="text-xs font-semibold text-gold/70 uppercase">Documents & Entretien</h3>
            <p className="text-xs text-cream-muted">Ces échéances alimentent automatiquement l’onglet alertes.</p>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">CT expire le</label>
              <Input
                type="date"
                value={dateInputValue('ctExpireAt')}
                onChange={(e) => update({ ctExpireAt: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Assurance expire le</label>
              <Input
                type="date"
                value={dateInputValue('assuranceExpireAt')}
                onChange={(e) => update({ assuranceExpireAt: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Km prochain entretien</label>
              <Input
                type="number"
                step={500}
                value={String(val('vidangeKm') || '')}
                onChange={(e) => update({ vidangeKm: parseInt(e.target.value) })}
                placeholder="Ex: 120000"
              />
            </div>
          </div>

          {/* Affichage site */}
          <div className="flex items-center justify-between pt-2 border-t border-gold/10">
            <div>
              <p className="text-sm text-cream">Affiché sur le site</p>
              <p className="text-xs text-cream-muted">Visible dans le catalogue public</p>
            </div>
            <button
              role="switch"
              aria-checked={Boolean(val('afficheSurSite'))}
              onClick={() => update({ afficheSurSite: !val('afficheSurSite') })}
              className={`relative w-11 h-6 rounded-full transition-colors ${val('afficheSurSite') ? 'bg-gold' : 'bg-noir-root border border-gold/20'}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${val('afficheSurSite') ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </section>
      </div>

      {/* Upload photos */}
      <section className="bg-noir-card border border-gold/10 rounded-xl p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-gold uppercase tracking-wider">Photos</h2>
            <p className="mt-1 text-xs text-cream-muted">Choisissez la photo produit qui sera affichée en priorité sur le site et dans la flotte.</p>
          </div>
          {featuredPhoto && (
            <div className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-gold">
              Photo produit définie
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          {photos.map((url: string, i: number) => {
            const isFeatured = url === featuredPhoto;

            return (
            <div key={url} className={`relative w-40 h-28 rounded-lg overflow-hidden border group ${isFeatured ? 'border-gold shadow-[0_0_0_1px_rgba(212,175,55,0.3)]' : 'border-gold/10'}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => applyPhotos([url, ...photos.filter((photo) => photo !== url)], url)}
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${isFeatured ? 'bg-gold text-noir-root' : 'bg-black/55 text-white hover:bg-gold hover:text-noir-root'}`}
                  >
                    <Star className="h-3 w-3" />
                    {isFeatured ? 'Photo produit' : 'Définir produit'}
                  </button>
                  <button
                    type="button"
                    onClick={() => applyPhotos(photos.filter((photo) => photo !== url), isFeatured ? undefined : featuredPhoto)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-red-500 hover:text-white"
                    aria-label={`Supprimer la photo ${i + 1}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
            );
          })}
          <label className="w-32 h-24 flex flex-col items-center justify-center rounded-lg border border-dashed border-gold/20 hover:border-gold/40 cursor-pointer transition-colors text-cream-muted hover:text-cream">
            <Upload className="w-5 h-5 mb-1" />
            <span className="text-xs">Ajouter</span>
            <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const fd = new FormData();
              fd.append('file', file);
              fd.append('folder', 'vehicles');
              const r = await fetch('/api/upload', { method: 'POST', body: fd });
              if (!r.ok) {
                const uploadError = await r.json().catch(() => null);
                toast.error(uploadError?.error ?? 'Erreur upload');
                return;
              }
              const d = await r.json();
              applyPhotos([...photos, d.data.url], featuredPhoto || d.data.url);
              toast.success('Photo ajoutée');
              e.target.value = '';
            }} />
          </label>
        </div>
      </section>

      {/* Photo modèle — appliquée à tous les véhicules de même marque + modèle */}
      <section className="bg-noir-card border border-gold/10 rounded-xl p-5">
        <div className="mb-4">
          <h2 className="text-sm font-semibold text-gold uppercase tracking-wider">Photo modèle</h2>
          <p className="mt-1 text-xs text-cream-muted">
            Cette photo sera utilisée par défaut pour tous les{' '}
            <span className="font-medium text-cream">{vehicle.marque} {vehicle.modele}</span>.
            Elle sert de photo de secours quand un véhicule n&apos;a pas de photo produit propre.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {(form.photoModele ?? vehicle.photoModele) ? (
            <div className="relative w-48 h-32 rounded-lg overflow-hidden border border-gold/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={String(form.photoModele ?? vehicle.photoModele)}
                alt="Photo modèle"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  update({ photoModele: '' } as any);
                }}
                className="absolute top-1.5 right-1.5 h-7 w-7 flex items-center justify-center rounded-full bg-black/55 text-white hover:bg-red-500 transition-colors"
                aria-label="Supprimer la photo modèle"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <label className="w-48 h-32 flex flex-col items-center justify-center rounded-lg border border-dashed border-gold/20 hover:border-gold/40 cursor-pointer transition-colors text-cream-muted hover:text-cream">
              <Upload className="w-5 h-5 mb-1" />
              <span className="text-xs">Choisir une photo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const fd = new FormData();
                  fd.append('file', file);
                  fd.append('folder', 'vehicles');
                  const r = await fetch('/api/upload', { method: 'POST', body: fd });
                  if (!r.ok) {
                    const uploadError = await r.json().catch(() => null);
                    toast.error(uploadError?.error ?? 'Erreur upload');
                    return;
                  }
                  const d = await r.json();
                  update({ photoModele: d.data.url } as any);
                  toast.success('Photo modèle ajoutée');
                  e.target.value = '';
                }}
              />
            </label>
          )}
          <div className="text-xs text-cream-faint max-w-xs">
            La mise à jour de cette photo sera propagée à tous les véhicules{' '}
            <span className="font-medium text-cream">{vehicle.marque} {vehicle.modele}</span>{' '}
            lors de l&apos;enregistrement.
          </div>
        </div>
      </section>
    </div>
  );
}
