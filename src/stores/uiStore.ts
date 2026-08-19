import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  toggleSidebar: () => void;

  // Modal états
  cautionModalOpen: boolean;
  cautionModalLocationId: string | null;
  openCautionModal: (locationId: string) => void;
  closeCautionModal: () => void;

  confirmModal: { open: boolean; title: string; description: string; onConfirm: (() => void) | null };
  openConfirmModal: (opts: { title: string; description: string; onConfirm: () => void }) => void;
  closeConfirmModal: () => void;

  quickPayModalOpen: boolean;
  quickPayTarget: { type: 'location' | 'reservation'; id: string } | null;
  openQuickPayModal: (type: 'location' | 'reservation', id: string) => void;
  closeQuickPayModal: () => void;

  prolongModalOpen: boolean;
  prolongLocationId: string | null;
  openProlongModal: (locationId: string) => void;
  closeProlongModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (v) => set({ sidebarOpen: v }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  cautionModalOpen: false,
  cautionModalLocationId: null,
  openCautionModal: (locationId) => set({ cautionModalOpen: true, cautionModalLocationId: locationId }),
  closeCautionModal: () => set({ cautionModalOpen: false, cautionModalLocationId: null }),

  confirmModal: { open: false, title: '', description: '', onConfirm: null },
  openConfirmModal: ({ title, description, onConfirm }) =>
    set({ confirmModal: { open: true, title, description, onConfirm } }),
  closeConfirmModal: () =>
    set({ confirmModal: { open: false, title: '', description: '', onConfirm: null } }),

  quickPayModalOpen: false,
  quickPayTarget: null,
  openQuickPayModal: (type, id) => set({ quickPayModalOpen: true, quickPayTarget: { type, id } }),
  closeQuickPayModal: () => set({ quickPayModalOpen: false, quickPayTarget: null }),

  prolongModalOpen: false,
  prolongLocationId: null,
  openProlongModal: (locationId) => set({ prolongModalOpen: true, prolongLocationId: locationId }),
  closeProlongModal: () => set({ prolongModalOpen: false, prolongLocationId: null }),
}));
