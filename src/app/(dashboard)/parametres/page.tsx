'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Trash2, AlertTriangle, Shield, Loader2, CheckCircle2 } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import toast from 'react-hot-toast';

interface PurgeTarget {
  key: string;
  label: string;
  description: string;
  icon: string;
  danger?: boolean;
}

const TARGETS: PurgeTarget[] = [
  { key: 'reservations', label: 'Réservations', description: 'Toutes les demandes et réservations', icon: '📅' },
  { key: 'locations', label: 'Locations', description: 'Toutes les locations en cours et terminées', icon: '📄' },
  { key: 'paiements', label: 'Paiements', description: 'Tous les encaissements et reçus', icon: '💰' },
  { key: 'clients', label: 'Clients', description: 'Toute la base clients', icon: '👤', danger: true },
  { key: 'etatsDesLieux', label: 'États des lieux', description: 'Tous les EDL départ/retour', icon: '📋' },
  { key: 'depenses', label: 'Dépenses', description: 'Toutes les dépenses opérationnelles', icon: '🧾' },
  { key: 'maintenance', label: 'Maintenance', description: 'Tous les dossiers maintenance', icon: '🔧' },
  { key: 'vehicules', label: 'Véhicules', description: 'Toute la flotte de véhicules', icon: '🚗', danger: true },
];

export default function ParametresPage() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [purging, setPurging] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    fetch('/api/admin/purge')
      .then((r) => r.json())
      .then((res) => setCounts(res.data ?? {}))
      .catch(() => toast.error('Impossible de charger les compteurs'))
      .finally(() => setLoading(false));
  }, []);

  const toggle = (key: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const selectAll = () => {
    if (selected.size === TARGETS.length) setSelected(new Set());
    else setSelected(new Set(TARGETS.map((t) => t.key)));
  };

  const totalSelected = TARGETS.filter((t) => selected.has(t.key)).reduce(
    (sum, t) => sum + (counts[t.key] ?? 0), 0,
  );

  const handlePurge = async () => {
    if (confirmText !== 'SUPPRIMER') {
      toast.error('Tapez SUPPRIMER pour confirmer');
      return;
    }

    setPurging(true);
    try {
      const res = await fetch('/api/admin/purge', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targets: [...selected], confirmation: 'SUPPRIMER' }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur');

      const results = payload.data?.results ?? {};
      const totalDeleted = Object.values(results as Record<string, number>).reduce((a, b) => a + b, 0);
      toast.success(`${totalDeleted} enregistrement${totalDeleted > 1 ? 's' : ''} supprimé${totalDeleted > 1 ? 's' : ''}`);

      // Rafraîchir les compteurs
      setCounts((prev) => {
        const next = { ...prev };
        for (const key of Object.keys(results)) next[key] = 0;
        return next;
      });
      setSelected(new Set());
      setShowConfirm(false);
      setConfirmText('');
    } catch (err: any) {
      toast.error(err.message ?? 'Erreur lors de la suppression');
    } finally {
      setPurging(false);
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <Sparkles className="h-3.5 w-3.5" /> administration
          </span>
          <h1 className="text-3xl font-bold text-cream">Paramètres</h1>
          <p className="mt-2 text-sm text-cream-muted">Gestion avancée et purge de données.</p>
        </div>
      </div>

      {/* Section Purge */}
      <section className="lux-panel p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3">
            <Trash2 className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-cream">Purge de données</h2>
            <p className="text-sm text-cream-muted">Sélectionnez les collections à vider. Cette action est irréversible.</p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <button
            onClick={selectAll}
            className="text-xs font-medium uppercase tracking-[0.14em] text-gold hover:text-gold/80 transition-colors"
          >
            {selected.size === TARGETS.length ? 'Tout désélectionner' : 'Tout sélectionner'}
          </button>
          {selected.size > 0 && (
            <Badge variant="amber">{selected.size} collection{selected.size > 1 ? 's' : ''} · {totalSelected} enregistrement{totalSelected > 1 ? 's' : ''}</Badge>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {TARGETS.map((target) => {
            const isSelected = selected.has(target.key);
            const count = counts[target.key] ?? 0;
            return (
              <button
                key={target.key}
                onClick={() => toggle(target.key)}
                className={`group relative rounded-2xl border p-4 text-left transition-all duration-200 ${
                  isSelected
                    ? 'border-red-500/40 bg-red-500/10 shadow-[0_0_24px_rgba(239,68,68,0.08)]'
                    : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                {isSelected && (
                  <div className="absolute right-3 top-3">
                    <CheckCircle2 className="h-4 w-4 text-red-400" />
                  </div>
                )}
                <div className="mb-2 text-xl">{target.icon}</div>
                <p className="text-sm font-semibold text-cream">{target.label}</p>
                <p className="mt-1 text-xs text-cream-faint">{target.description}</p>
                <div className="mt-3">
                  {loading ? (
                    <div className="h-5 w-12 animate-pulse rounded bg-white/5" />
                  ) : (
                    <Badge variant={count > 0 ? (isSelected ? 'red' : 'muted') : 'green'}>
                      {count} enregistrement{count > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
                {target.danger && (
                  <p className="mt-2 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-400">
                    <AlertTriangle className="h-3 w-3" /> critique
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {/* Bouton de purge */}
        {selected.size > 0 && !showConfirm && (
          <div className="mt-6 flex justify-end">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(true)}
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" /> Supprimer les données sélectionnées
            </Button>
          </div>
        )}

        {/* Zone de confirmation */}
        {showConfirm && (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5 p-6">
            <div className="mb-4 flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />
              <div>
                <p className="text-sm font-semibold text-red-300">Confirmation requise</p>
                <p className="mt-1 text-xs text-cream-muted">
                  Vous allez supprimer définitivement <span className="font-bold text-red-300">{totalSelected}</span> enregistrement{totalSelected > 1 ? 's' : ''} dans {selected.size} collection{selected.size > 1 ? 's' : ''}.
                  Cette opération est <span className="font-bold text-red-300">irréversible</span>.
                </p>
                <ul className="mt-2 space-y-1">
                  {TARGETS.filter((t) => selected.has(t.key)).map((t) => (
                    <li key={t.key} className="text-xs text-cream-faint">
                      {t.icon} {t.label} — <span className="text-red-300">{counts[t.key] ?? 0}</span> éléments
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-cream-faint">
                  Tapez <span className="font-bold text-red-300">SUPPRIMER</span> pour confirmer
                </label>
                <input
                  type="text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="SUPPRIMER"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-cream placeholder:text-cream-faint focus:border-red-500/40 focus:outline-none focus:ring-1 focus:ring-red-500/20"
                  autoComplete="off"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => { setShowConfirm(false); setConfirmText(''); }}
                >
                  Annuler
                </Button>
                <Button
                  variant="outline"
                  disabled={confirmText !== 'SUPPRIMER' || purging}
                  onClick={handlePurge}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10 disabled:opacity-40"
                >
                  {purging ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Suppression...</>
                  ) : (
                    <><Trash2 className="h-4 w-4" /> Confirmer la suppression</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
