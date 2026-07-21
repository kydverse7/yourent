'use client';

import { useEffect, useState } from 'react';
import { Sun } from 'lucide-react';
import { Button } from '@/components/ui';
import toast from 'react-hot-toast';

export default function HighSeasonToggle() {
  const [highSeason, setHighSeason] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((payload) => {
        setHighSeason(payload.data?.highSeason ?? false);
      })
      .catch(() => toast.error('Impossible de charger le paramètre haute saison'))
      .finally(() => setLoading(false));
  }, []);

  const toggle = async () => {
    setSaving(true);
    try {
      const next = !highSeason;
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ highSeason: next }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur');
      setHighSeason(payload.data.highSeason);
      toast.success(
        payload.data.highSeason
          ? 'Haute saison activée — tarif de base appliqué sur toutes les durées'
          : 'Haute saison désactivée — palier 11+ jours réactivé'
      );
    } catch (err: any) {
      toast.error(err.message ?? 'Erreur');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`rounded-2xl border p-5 transition-colors ${
        highSeason
          ? 'border-amber-400/30 bg-amber-400/10'
          : 'border-white/8 bg-white/[0.03]'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-2xl p-3 ${
              highSeason ? 'bg-amber-400/20 text-amber-300' : 'bg-white/5 text-cream-faint'
            }`}
          >
            <Sun className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-cream">Haute saison</h3>
            <p className="text-xs text-cream-muted">
              {highSeason
                ? 'Tarif journalier de base forcé sur toutes les durées'
                : 'Palier 11+ jours actif (remise longue durée)'}
            </p>
          </div>
        </div>
        <Button
          variant={highSeason ? 'gold' : 'outline'}
          size="sm"
          disabled={loading || saving}
          onClick={toggle}
        >
          {saving ? 'Mise à jour…' : highSeason ? 'Désactiver' : 'Activer'}
        </Button>
      </div>
    </div>
  );
}
