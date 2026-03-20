import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { useFilterStore } from '@/stores/filterStore';

const buildVehicleParams = (f: ReturnType<typeof useFilterStore.getState>['vehicles']) => {
  const p = new URLSearchParams();
  if (f.q) p.set('q', f.q);
  if (f.statut) p.set('statut', f.statut);
  if (f.type) p.set('type', f.type);
  p.set('page', String(f.page));
  p.set('limit', '20');
  return p.toString();
};

export function useVehicles() {
  const filters = useFilterStore((s) => s.vehicles);

  return useQuery({
    queryKey: ['vehicles', filters],
    queryFn: async () => {
      const res = await fetch(`/api/vehicles?${buildVehicleParams(filters)}`);
      if (!res.ok) throw new Error('Erreur chargement véhicules');
      return res.json();
    },
    placeholderData: keepPreviousData,
  });
}

export function useVehicle(id: string) {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      const res = await fetch(`/api/vehicles/${id}`);
      if (!res.ok) throw new Error('Véhicule introuvable');
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCreateVehicle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Erreur création');
      }
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vehicles'] }),
  });
}

export function useUpdateVehicle(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: unknown) => {
      const res = await fetch(`/api/vehicles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Erreur mise à jour');
      }
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['vehicles'] });
      qc.invalidateQueries({ queryKey: ['vehicle', id] });
    },
  });
}

export function useDeleteVehicle() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/vehicles/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erreur suppression');
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vehicles'] }),
  });
}
