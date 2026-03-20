import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { useFilterStore } from '@/stores/filterStore';

export function useLocations(overrides?: { statut?: string }) {
  const filters = useFilterStore((s) => s.locations);
  const statut = overrides?.statut ?? filters.statut;

  return useQuery({
    queryKey: ['locations', { ...filters, statut }],
    queryFn: async () => {
      const p = new URLSearchParams();
      if (statut) p.set('statut', statut);
      if (filters.vehicule) p.set('vehicule', filters.vehicule);
      if (filters.client) p.set('client', filters.client);
      p.set('page', String(filters.page));
      p.set('limit', '20');
      const res = await fetch(`/api/locations?${p}`);
      if (!res.ok) throw new Error('Erreur chargement locations');
      return res.json();
    },
    placeholderData: keepPreviousData,
  });
}

export function useLocation(id: string) {
  return useQuery({
    queryKey: ['location', id],
    queryFn: async () => {
      const res = await fetch(`/api/locations/${id}`);
      if (!res.ok) throw new Error('Location introuvable');
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCreateLocation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Erreur création location');
      }
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['locations'] });
      qc.invalidateQueries({ queryKey: ['vehicles'] }); // statut véhicule mis à jour
    },
  });
}

export function useCloseLocation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await fetch(`/api/locations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Erreur clôture');
      }
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['locations'] });
      qc.invalidateQueries({ queryKey: ['location', id] });
      qc.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
}

export function useFinances(view?: 'summary' | 'vehicules' | 'chart') {
  const filters = useFilterStore((s) => s.finances);
  const resolvedView = view ?? filters.view;
  return useQuery({
    queryKey: ['finances', { ...filters, view: resolvedView }],
    queryFn: async () => {
      const p = new URLSearchParams({ view: resolvedView });
      if (filters.from) p.set('from', filters.from);
      if (filters.to) p.set('to', filters.to);
      const res = await fetch(`/api/finances?${p}`);
      if (!res.ok) throw new Error('Erreur chargement finances');
      return res.json();
    },
    placeholderData: keepPreviousData,
  });
}
