'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Plus, Search, Car, Sparkles, ChevronDown, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useFilterStore } from '@/stores/filterStore';
import { Badge, Button, Input } from '@/components/ui';
import { formatCurrency, getStatutColor } from '@/lib/utils';

interface VehicleItem {
  _id: string;
  marque: string;
  modele: string;
  immatriculation: string;
  annee: number;
  type: string;
  statut: string;
  couleur?: string;
  kilometrage?: number;
  carburant?: string;
  transmission?: string;
  places?: number;
  tarifJour: number;
  tarifJour10Plus: number;
  photos?: string[];
  backgroundPhoto?: string;
  photoModele?: string;
}

interface ModelGroup {
  marque: string;
  modele: string;
  type: string;
  vehicles: VehicleItem[];
}

export default function VehiculesPage() {
  const filters = useFilterStore((s) => s.vehicles);
  const setFilters = useFilterStore((s) => s.setVehicleFilters);
  const [searchInput, setSearchInput] = useState(filters.q);
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const [selectedVehicleIdx, setSelectedVehicleIdx] = useState<Record<string, number>>({});

  const { data, isLoading } = useQuery({
    queryKey: ['vehicles-grouped', { statut: filters.statut, type: filters.type }],
    queryFn: async () => {
      const p = new URLSearchParams({ grouped: 'true' });
      if (filters.statut) p.set('statut', filters.statut);
      if (filters.type) p.set('type', filters.type);
      const res = await fetch(`/api/vehicles?${p}`);
      if (!res.ok) throw new Error('Erreur');
      return res.json();
    },
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });

  const groups: ModelGroup[] = data?.data?.groups ?? [];
  const totalVehicles: number = data?.data?.total ?? 0;
  const totalGroups: number = data?.data?.totalGroups ?? 0;

  // Filter groups by search on client side for instant matching
  const filteredGroups = useMemo(() => {
    const normalizedSearch = searchInput.trim().toLowerCase();
    if (!normalizedSearch) return groups;

    return groups.filter((group) =>
      group.marque.toLowerCase().includes(normalizedSearch)
      || group.modele.toLowerCase().includes(normalizedSearch)
      || group.vehicles.some((vehicle) => vehicle.immatriculation.toLowerCase().includes(normalizedSearch)),
    );
  }, [groups, searchInput]);

  const toggleModel = (key: string) => {
    setExpandedModel((prev) => (prev === key ? null : key));
  };

  const getSelectedIdx = (key: string) => selectedVehicleIdx[key] ?? 0;

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <Sparkles className="h-3.5 w-3.5" /> flotte & image
          </span>
          <h1 className="text-3xl font-bold text-cream">Véhicules</h1>
          <p className="mt-2 text-sm text-cream-muted">
            {totalVehicles} véhicule{totalVehicles > 1 ? 's' : ''} · {totalGroups} modèle{totalGroups > 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/vehicules/nouveau">
          <Button variant="gold" size="md">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un véhicule
          </Button>
        </Link>
      </div>

      <div className="lux-filter-bar flex-col sm:flex-row">
        <div className="flex gap-2 flex-1">
          <Input
            placeholder="Rechercher marque, modèle, immat..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
            className="flex-1"
          />
        </div>
        <div className="flex gap-2">
          {['', 'disponible', 'loue', 'maintenance'].map((s) => (
            <button
              key={s}
              onClick={() => setFilters({ statut: s, page: 1 })}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
                filters.statut === s
                  ? 'bg-gold text-noir-root'
                  : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
              }`}
            >
              {s === '' ? 'Tous' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]" />
          ))}
        </div>
      )}

      {/* Model groups */}
      {!isLoading && filteredGroups.length === 0 && (
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-16 text-center">
          <Car className="mx-auto mb-3 h-8 w-8 text-cream-faint" />
          <p className="text-sm text-cream-muted">Aucun véhicule trouvé.</p>
        </div>
      )}

      <div className="space-y-3">
        {filteredGroups.map((group) => {
          const key = `${group.marque}-${group.modele}`;
          const isExpanded = expandedModel === key;
          const selectedIdx = getSelectedIdx(key);
          const selected = group.vehicles[selectedIdx] ?? group.vehicles[0];
          const photo = selected?.backgroundPhoto ?? selected?.photoModele ?? selected?.photos?.[0];
          const disponibles = group.vehicles.filter((v) => v.statut === 'disponible').length;
          const loues = group.vehicles.filter((v) => v.statut === 'loue').length;

          return (
            <div key={key} className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] transition-all">
              {/* Model row header */}
              <button
                onClick={() => toggleModel(key)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
              >
                <div className="shrink-0">
                  {photo ? (
                    <Image src={photo} alt="" width={64} height={44} className="rounded-lg object-cover" />
                  ) : (
                    <div className="flex h-11 w-16 items-center justify-center rounded-lg bg-gold/10">
                      <Car className="h-5 w-5 text-gold/40" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-cream">{group.marque} {group.modele}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-cream-faint">
                    <span className="capitalize">{group.type}</span>
                    <span>·</span>
                    <span>{group.vehicles.length} véhicule{group.vehicles.length > 1 ? 's' : ''}</span>
                    {disponibles > 0 && (
                      <Badge variant="green">{disponibles} dispo</Badge>
                    )}
                    {loues > 0 && (
                      <Badge variant="blue">{loues} loué{loues > 1 ? 's' : ''}</Badge>
                    )}
                  </div>
                </div>

                <div className="shrink-0 text-cream-faint">
                  {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                </div>
              </button>

              {/* Expanded: vehicle tabs + detail */}
              {isExpanded && (
                <div className="border-t border-white/5">
                  {/* Tabs - each vehicle */}
                  <div className="flex gap-1 overflow-x-auto border-b border-white/5 px-4 py-2">
                    {group.vehicles.map((v, idx) => (
                      <button
                        key={v._id}
                        onClick={() => setSelectedVehicleIdx((prev) => ({ ...prev, [key]: idx }))}
                        className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                          selectedIdx === idx
                            ? 'border border-gold/30 bg-gold/10 text-gold'
                            : 'border border-transparent text-cream-muted hover:bg-white/5 hover:text-cream'
                        }`}
                      >
                        <Badge variant={getStatutColor(v.statut) as any} className="text-[10px]">
                          {v.statut.replace('_', ' ')}
                        </Badge>
                        <span>{v.immatriculation}</span>
                        <span className="text-cream-faint">{v.annee}</span>
                      </button>
                    ))}
                  </div>

                  {/* Selected vehicle detail card */}
                  {selected && (
                    <div className="grid gap-5 p-5 md:grid-cols-[auto_1fr_auto]">
                      {/* Photo */}
                      <div className="shrink-0">
                        {(selected.backgroundPhoto ?? selected.photoModele ?? selected.photos?.[0]) ? (
                          <Image
                            src={selected.backgroundPhoto ?? selected.photoModele ?? selected.photos![0]}
                            alt=""
                            width={180}
                            height={120}
                            className="rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-[120px] w-[180px] items-center justify-center rounded-xl bg-gold/5">
                            <Car className="h-10 w-10 text-gold/20" />
                          </div>
                        )}
                      </div>

                      {/* Info grid */}
                      <div className="grid min-w-0 grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-cream-faint">Immatriculation</p>
                          <p className="mt-0.5 text-sm font-medium text-cream">{selected.immatriculation}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-cream-faint">Année</p>
                          <p className="mt-0.5 text-sm font-medium text-cream">{selected.annee}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-cream-faint">Couleur</p>
                          <p className="mt-0.5 text-sm font-medium text-cream">{selected.couleur ?? '—'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-cream-faint">Kilométrage</p>
                          <p className="mt-0.5 text-sm font-medium text-cream">{(selected.kilometrage ?? 0).toLocaleString('fr-FR')} km</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-cream-faint">Carburant</p>
                          <p className="mt-0.5 text-sm capitalize font-medium text-cream">{selected.carburant ?? '—'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-cream-faint">Transmission</p>
                          <p className="mt-0.5 text-sm capitalize font-medium text-cream">{selected.transmission ?? '—'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-cream-faint">Places</p>
                          <p className="mt-0.5 text-sm font-medium text-cream">{selected.places ?? '—'}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-cream-faint">Tarif / jour</p>
                          <p className="mt-0.5 text-sm font-semibold text-gold">{formatCurrency(selected.tarifJour ?? 0)}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.16em] text-cream-faint">Tarif 11+ jours</p>
                          <p className="mt-0.5 text-sm font-semibold text-gold">{formatCurrency(selected.tarifJour10Plus ?? 0)}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 self-start">
                        <Link href={`/vehicules/${selected._id}`}>
                          <Button variant="gold" size="sm" className="w-full">Fiche complète</Button>
                        </Link>
                        <Link href={`/vehicules/${selected._id}`}>
                          <Button variant="outline" size="sm" className="w-full">Modifier</Button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
