'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, ExternalLink, Save, ShieldCheck, Trash2, Upload, UserCheck, UserX } from 'lucide-react';
import Link from 'next/link';
import { Button, Input, Select, Badge, Skeleton } from '@/components/ui';
import { useUIStore } from '@/stores/uiStore';
import toast from 'react-hot-toast';
import { use } from 'react';

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const qc = useQueryClient();
  const openConfirmModal = useUIStore((s) => s.openConfirmModal);

  const { data, isLoading } = useQuery({
    queryKey: ['client', id],
    queryFn: async () => {
      const res = await fetch(`/api/clients/${id}`);
      if (!res.ok) throw new Error('Client introuvable');
      return res.json();
    },
    initialData: () => {
      const cachedLists = qc.getQueriesData<{ data?: Array<Record<string, unknown>> }>({
        queryKey: ['clients'],
      });

      for (const [, cached] of cachedLists) {
        const client = cached?.data?.find((item) => String(item._id) === id);
        if (client) return { data: client };
      }

      return undefined;
    },
    staleTime: 30_000,
  });

  const client = data?.data;

  const [form, setForm] = useState<Record<string, unknown>>({});
  const [dirty, setDirty] = useState(false);
  const [blacklistMotif, setBlacklistMotif] = useState('');
  const [showBlacklistForm, setShowBlacklistForm] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const val = (key: string) => {
    if (key in form) return form[key];
    return client?.[key] ?? '';
  };

  const update = (f: Record<string, unknown>) => {
    setForm((p) => ({ ...p, ...f }));
    setDirty(true);
  };

  const uploadDocument = async (field: string, file: File) => {
    try {
      setUploadingField(field);
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'clients');

      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur upload document');

      update({ [field]: payload.data.url });
      toast.success('Document ajouté, pensez à enregistrer la fiche');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur upload');
    } finally {
      setUploadingField(null);
    }
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? 'Erreur');
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success('Client mis à jour');
      qc.invalidateQueries({ queryKey: ['clients'] });
      qc.invalidateQueries({ queryKey: ['client', id] });
      setDirty(false);
      setForm({});
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const blacklistMutation = useMutation({
    mutationFn: async ({ action, motif }: { action: 'add' | 'remove'; motif?: string }) => {
      const method = action === 'add' ? 'POST' : 'DELETE';
      const res = await fetch(`/api/clients/${id}/blacklist`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: action === 'add' ? JSON.stringify({ motif }) : undefined,
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? 'Erreur');
      }
      return res.json();
    },
    onSuccess: (_, vars) => {
      toast.success(vars.action === 'add' ? 'Client blacklisté' : 'Blacklist levée');
      qc.invalidateQueries({ queryKey: ['clients'] });
      qc.invalidateQueries({ queryKey: ['client', id] });
      setShowBlacklistForm(false);
      setBlacklistMotif('');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error ?? 'Erreur');
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success('Client archivé');
      qc.invalidateQueries({ queryKey: ['clients'] });
      router.push('/clients');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-20">
        <p className="text-cream-muted">Client introuvable</p>
        <Link href="/clients">
          <Button variant="outline" className="mt-4">← Retour</Button>
        </Link>
      </div>
    );
  }

  const isBlacklisted = client.blacklist?.actif;

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-4">
          <Link href="/clients">
            <button className="p-2 rounded-lg text-cream-muted hover:text-cream hover:bg-gold/5 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-cream">{client.prenom} {client.nom}</h1>
            <p className="text-sm text-cream-muted">{client.telephone}</p>
          </div>
          {isBlacklisted && <Badge variant="red">Blacklisté</Badge>}
          {client.vip && <Badge variant="gold">VIP</Badge>}
        </div>
        <div className="flex gap-2">
          {dirty && (
            <Button variant="gold" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending}>
              <Save className="w-4 h-4 mr-2" />
              {saveMutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          )}
          {isBlacklisted ? (
            <Button
              variant="outline"
              onClick={() => openConfirmModal({
                title: 'Lever le blacklist ?',
                description: `${client.prenom} ${client.nom} pourra à nouveau effectuer des réservations.`,
                onConfirm: () => blacklistMutation.mutate({ action: 'remove' }),
              })}
            >
              <UserCheck className="w-4 h-4 mr-2" />
              Lever blacklist
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="text-amber-400 hover:bg-amber-500/10"
              onClick={() => setShowBlacklistForm(!showBlacklistForm)}
            >
              <UserX className="w-4 h-4 mr-2" />
              Blacklister
            </Button>
          )}
          <Button
            variant="ghost"
            className="text-red-400 hover:bg-red-500/10"
            onClick={() => openConfirmModal({
              title: 'Archiver ce client ?',
              description: `${client.prenom} ${client.nom} sera masqué du système.`,
              onConfirm: () => deleteMutation.mutate(),
            })}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Formulaire blacklist */}
      {showBlacklistForm && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 space-y-3">
          <p className="text-sm text-amber-200 font-medium">Motif de blacklist (min. 10 caractères)</p>
          <textarea
            value={blacklistMotif}
            onChange={(e) => setBlacklistMotif(e.target.value)}
            rows={2}
            placeholder="Décrivez la raison..."
            className="w-full bg-noir-root border border-amber-500/30 rounded-lg px-3 py-2 text-sm text-cream placeholder:text-cream-faint focus:outline-none focus:border-amber-500/60 resize-none"
          />
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowBlacklistForm(false)}>Annuler</Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-400 hover:bg-red-500/10 border border-red-500/30"
              disabled={blacklistMotif.length < 10 || blacklistMutation.isPending}
              onClick={() => blacklistMutation.mutate({ action: 'add', motif: blacklistMotif })}
            >
              Confirmer le blacklist
            </Button>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total locations', value: client.stats?.totalLocations ?? 0 },
          { label: 'Total dépensé', value: `${(client.stats?.totalDepenses ?? 0).toLocaleString('fr-MA')} MAD` },
          { label: 'Remise habituel', value: `${client.remiseHabituels ?? 0}%` },
          { label: 'Dernière location', value: client.stats?.derniereLouage ? new Date(client.stats.derniereLouage).toLocaleDateString('fr-MA') : '—' },
        ].map(({ label, value }) => (
          <div key={label} className="bg-noir-card border border-gold/10 rounded-xl p-4">
            <p className="text-xs text-cream-muted mb-1">{label}</p>
            <p className="text-lg font-bold text-cream">{value}</p>
          </div>
        ))}
      </div>

      {/* Formulaire */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Identité */}
        <section className="bg-noir-card border border-gold/10 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gold uppercase tracking-wider">Identité</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Type</label>
              <Select value={String(val('type'))} onChange={(e) => update({ type: e.target.value })}>
                <option value="particulier">Particulier</option>
                <option value="entreprise">Entreprise</option>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Nom *</label>
              <Input value={String(val('nom'))} onChange={(e) => update({ nom: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Prénom</label>
              <Input value={String(val('prenom') || '')} onChange={(e) => update({ prenom: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Téléphone *</label>
              <Input value={String(val('telephone'))} onChange={(e) => update({ telephone: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Email</label>
              <Input type="email" value={String(val('email') || '')} onChange={(e) => update({ email: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Ville</label>
              <Input value={String(val('ville') || '')} onChange={(e) => update({ ville: e.target.value })} />
            </div>
          </div>
        </section>

        {/* Document */}
        <section className="bg-noir-card border border-gold/10 rounded-xl p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gold uppercase tracking-wider">Document d&apos;identité</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Type document</label>
              <Select value={String(val('documentType') || 'cin')} onChange={(e) => update({ documentType: e.target.value })}>
                <option value="cin">CIN</option>
                <option value="passeport">Passeport</option>
                <option value="titre_sejour">Titre de séjour</option>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Numéro</label>
              <Input value={String(val('documentNumber') || '')} onChange={(e) => update({ documentNumber: e.target.value })} />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Expire le</label>
              <Input
                type="date"
                value={client.documentExpireLe ? new Date(client.documentExpireLe).toISOString().split('T')[0] : ''}
                onChange={(e) => update({ documentExpireLe: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {[
              { key: 'cinRectoUrl', label: 'CIN / document recto' },
              { key: 'cinVersoUrl', label: 'CIN / document verso' },
              { key: 'permisRectoUrl', label: 'Permis recto' },
              { key: 'permisVersoUrl', label: 'Permis verso' },
            ].map((item) => {
              const url = String(val(item.key) || '');
              const isUploading = uploadingField === item.key;

              return (
                <div key={item.key} className="rounded-xl border border-gold/10 bg-noir-root/60 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <p className="text-sm font-medium text-cream">{item.label}</p>
                  </div>

                  {url ? (
                    <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-light">
                      <ExternalLink className="w-4 h-4" /> Ouvrir le document
                    </a>
                  ) : (
                    <p className="text-xs text-cream-muted">Aucun fichier rattaché.</p>
                  )}

                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gold/20 bg-gold/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold hover:bg-gold/10">
                    <Upload className="w-4 h-4" />
                    {isUploading ? 'Upload...' : 'Ajouter fichier'}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      disabled={isUploading}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        await uploadDocument(item.key, file);
                        e.target.value = '';
                      }}
                    />
                  </label>

                  <Input
                    label="URL manuelle"
                    value={url}
                    onChange={(e) => update({ [item.key]: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              );
            })}
          </div>

          <div className="border-t border-gold/10 pt-3 space-y-3">
            <h3 className="text-xs font-semibold text-gold/70 uppercase">Permis de conduire</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-cream-muted">N° permis</label>
                <Input value={String(val('permisNumero') || '')} onChange={(e) => update({ permisNumero: e.target.value })} />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-cream-muted">Expire le</label>
                <Input
                  type="date"
                  value={client.permisExpireLe ? new Date(client.permisExpireLe).toISOString().split('T')[0] : ''}
                  onChange={(e) => update({ permisExpireLe: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gold/10 pt-3 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cream">Client VIP</p>
                <p className="text-xs text-cream-muted">Traitement prioritaire</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={Boolean(val('vip'))}
                onClick={() => update({ vip: !val('vip') })}
                className={`relative w-11 h-6 rounded-full transition-colors ${val('vip') ? 'bg-gold' : 'bg-noir-root border border-gold/20'}`}
              >
                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${val('vip') ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <div className="space-y-1">
              <label className="text-xs text-cream-muted">Remise habituelle (%)</label>
              <Input
                type="number"
                min={0}
                max={100}
                value={String(val('remiseHabituels') || 0)}
                onChange={(e) => update({ remiseHabituels: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Notes internes */}
      <section className="bg-noir-card border border-gold/10 rounded-xl p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gold uppercase tracking-wider">Notes internes</h2>
        <textarea
          value={String(val('notesInternes') || '')}
          onChange={(e) => update({ notesInternes: e.target.value })}
          rows={3}
          placeholder="Observations confidentielles..."
          className="w-full bg-noir-root border border-gold/10 rounded-lg px-3 py-2 text-sm text-cream placeholder:text-cream-faint focus:outline-none focus:border-gold/40 transition-colors resize-none"
        />
      </section>

      {/* Blacklist info */}
      {isBlacklisted && client.blacklist?.motif && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <p className="text-xs font-semibold text-red-400 uppercase mb-1">Raison du blacklist</p>
          <p className="text-sm text-cream">{client.blacklist.motif}</p>
          {client.blacklist.dateBlacklist && (
            <p className="text-xs text-cream-muted mt-1">
              Le {new Date(client.blacklist.dateBlacklist).toLocaleDateString('fr-MA')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
