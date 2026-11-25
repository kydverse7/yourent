'use client';

import { Toaster } from 'react-hot-toast';

/** Zone d'affichage des notifications. */
export function PublicToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'rgba(17,17,17,0.92)',
          color: '#F5F0E8',
          border: '1px solid rgba(201,168,76,0.22)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 18px 42px rgba(0,0,0,0.38)',
          borderRadius: '18px',
        },
        success: { iconTheme: { primary: '#C9A84C', secondary: '#0A0A0A' } },
      }}
    />
  );
}
