'use client';

import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, Download, FileSpreadsheet, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui';
import { exportParcExcel, exportParcImage, type ParcSnapshot } from '@/lib/export/parcExport';

const contentClass =
  'min-w-[220px] rounded-2xl border border-white/5 bg-[#111111] p-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)]';

const itemClass =
  'flex cursor-pointer select-none items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-cream-muted outline-none transition-colors data-[highlighted]:bg-white/5 data-[highlighted]:text-cream';

export function ParcExportButton() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (kind: 'excel' | 'image') => {
    if (isExporting) return;
    setIsExporting(true);
    const toastId = toast.loading("Génération de l'export…");
    try {
      const res = await fetch('/api/locations/parc');
      if (!res.ok) throw new Error('Erreur chargement parc');
      const json = await res.json();
      const snapshot: ParcSnapshot = json?.data;
      if (!snapshot || !snapshot.rows || snapshot.rows.length === 0) {
        toast.error('Aucun véhicule à exporter', { id: toastId });
        return;
      }
      if (kind === 'excel') await exportParcExcel(snapshot);
      else await exportParcImage(snapshot);
      toast.success(kind === 'excel' ? 'Fichier Excel téléchargé' : 'Image téléchargée', { id: toastId });
    } catch {
      toast.error("Échec de l'export", { id: toastId });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline" disabled={isExporting}>
          <Download className="w-4 h-4" />
          Exporter
          <ChevronDown className="w-3.5 h-3.5" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className={contentClass} sideOffset={6} align="end">
          <DropdownMenu.Item className={itemClass} onSelect={() => handleExport('excel')}>
            <FileSpreadsheet className="w-4 h-4 text-gold" />
            Fichier Excel (.xlsx)
          </DropdownMenu.Item>
          <DropdownMenu.Item className={itemClass} onSelect={() => handleExport('image')}>
            <ImageIcon className="w-4 h-4 text-gold" />
            Image (.png)
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
