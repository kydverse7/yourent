'use client';

import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui';
import { useUIStore } from '@/stores/uiStore';

export function ConfirmModal() {
  const { confirmModal, closeConfirmModal } = useUIStore();
  const cancelBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (confirmModal.open) cancelBtnRef.current?.focus();
  }, [confirmModal.open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && confirmModal.open) closeConfirmModal();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [confirmModal.open, closeConfirmModal]);

  if (!confirmModal.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeConfirmModal}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md bg-noir-card border border-gold/10 rounded-xl shadow-2xl p-6 animate-slide-up">
        <div className="w-12 h-12 rounded-full bg-red-500/15 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400" />
        </div>

        <h2 className="text-lg font-semibold text-cream text-center mb-2">{confirmModal.title}</h2>
        <p className="text-sm text-cream-muted text-center mb-6">{confirmModal.description}</p>

        <div className="flex gap-3">
          <Button ref={cancelBtnRef} variant="outline" className="flex-1" onClick={closeConfirmModal}>
            Annuler
          </Button>
          <Button
            variant="ghost"
            className="flex-1 text-red-400 hover:bg-red-500/10 border border-red-500/30"
            onClick={() => {
              confirmModal.onConfirm?.();
              closeConfirmModal();
            }}
          >
            Confirmer
          </Button>
        </div>
      </div>
    </div>
  );
}
