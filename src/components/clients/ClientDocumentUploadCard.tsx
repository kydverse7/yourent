'use client';

import type { ChangeEvent } from 'react';
import { Camera, ExternalLink, ShieldCheck, Upload } from 'lucide-react';
import { Input } from '@/components/ui';

type ClientDocumentUploadCardProps = {
  label: string;
  value?: string;
  uploading?: boolean;
  helperText?: string;
  emptyText?: string;
  onUpload: (file: File) => Promise<void> | void;
  onValueChange: (value: string) => void;
};

function handleSingleFileChange(
  event: ChangeEvent<HTMLInputElement>,
  onUpload: (file: File) => Promise<void> | void,
) {
  const file = event.target.files?.[0];
  if (!file) return;

  void Promise.resolve(onUpload(file)).finally(() => {
    event.target.value = '';
  });
}

export function ClientDocumentUploadCard({
  label,
  value,
  uploading = false,
  helperText,
  emptyText = 'Aucun fichier rattaché.',
  onUpload,
  onValueChange,
}: ClientDocumentUploadCardProps) {
  return (
    <div className="rounded-xl border border-gold/10 bg-noir-root/60 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-gold" />
        <p className="text-sm font-medium text-cream">{label}</p>
      </div>

      {value ? (
        <a
          href={value}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light"
        >
          <ExternalLink className="w-4 h-4" /> Ouvrir le document
        </a>
      ) : (
        <p className="text-xs text-cream-muted">{emptyText}</p>
      )}

      <div className="flex flex-wrap gap-2">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gold/30 bg-gold/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold/15">
          <Camera className="w-4 h-4" />
          {uploading ? 'Upload...' : 'Prendre photo'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            capture="environment"
            className="hidden"
            disabled={uploading}
            onChange={(event) => handleSingleFileChange(event, onUpload)}
          />
        </label>

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gold/20 bg-gold/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold/10">
          <Upload className="w-4 h-4" />
          {uploading ? 'Upload...' : 'Ajouter fichier'}
          <input
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            disabled={uploading}
            onChange={(event) => handleSingleFileChange(event, onUpload)}
          />
        </label>
      </div>

      <Input
        label="URL manuelle"
        value={value ?? ''}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder="https://..."
      />

      {helperText ? <p className="text-[11px] text-cream-faint">{helperText}</p> : null}
    </div>
  );
}