import { create } from 'zustand';

interface VehicleFilters {
  q: string;
  statut: string;
  type: string;
  page: number;
}

interface ClientFilters {
  q: string;
  blacklist: boolean;
  page: number;
}

interface ReservationFilters {
  statut: string;
  vehicule: string;
  page: number;
}

interface LocationFilters {
  statut: string;
  vehicule: string;
  client: string;
  page: number;
}

interface FinanceFilters {
  from: string;
  to: string;
  view: 'summary' | 'vehicules' | 'chart';
}

interface FilterState {
  vehicles: VehicleFilters;
  setVehicleFilters: (f: Partial<VehicleFilters>) => void;
  resetVehicleFilters: () => void;

  clients: ClientFilters;
  setClientFilters: (f: Partial<ClientFilters>) => void;
  resetClientFilters: () => void;

  reservations: ReservationFilters;
  setReservationFilters: (f: Partial<ReservationFilters>) => void;

  locations: LocationFilters;
  setLocationFilters: (f: Partial<LocationFilters>) => void;

  finances: FinanceFilters;
  setFinanceFilters: (f: Partial<FinanceFilters>) => void;
}

const defaultVehicleFilters: VehicleFilters = { q: '', statut: '', type: '', page: 1 };
const defaultClientFilters: ClientFilters = { q: '', blacklist: false, page: 1 };
const defaultReservationFilters: ReservationFilters = { statut: '', vehicule: '', page: 1 };
const defaultLocationFilters: LocationFilters = { statut: '', vehicule: '', client: '', page: 1 };

const now = new Date();
const defaultFinanceFilters: FinanceFilters = {
  from: new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0],
  to: new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0],
  view: 'summary',
};

export const useFilterStore = create<FilterState>((set) => ({
  vehicles: defaultVehicleFilters,
  setVehicleFilters: (f) => set((s) => ({ vehicles: { ...s.vehicles, ...f, page: f.page ?? 1 } })),
  resetVehicleFilters: () => set({ vehicles: defaultVehicleFilters }),

  clients: defaultClientFilters,
  setClientFilters: (f) => set((s) => ({ clients: { ...s.clients, ...f, page: f.page ?? 1 } })),
  resetClientFilters: () => set({ clients: defaultClientFilters }),

  reservations: defaultReservationFilters,
  setReservationFilters: (f) => set((s) => ({ reservations: { ...s.reservations, ...f } })),

  locations: defaultLocationFilters,
  setLocationFilters: (f) => set((s) => ({ locations: { ...s.locations, ...f } })),

  finances: defaultFinanceFilters,
  setFinanceFilters: (f) => set((s) => ({ finances: { ...s.finances, ...f } })),
}));
