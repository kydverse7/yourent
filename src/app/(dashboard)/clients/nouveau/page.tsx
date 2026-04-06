'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { Button, Input, Select } from '@/components/ui';
import { ClientDocumentUploadCard } from '@/components/clients/ClientDocumentUploadCard';
import toast from 'react-hot-toast';

interface ClientForm {
  type: 'particulier' | 'entreprise';
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  documentType: 'cin' | 'passeport' | 'titre_sejour';
  documentNumber: string;
  documentExpireLe: string;
  ville: string;
  permisNumero: string;
  permisCategorie: string;
  permisDelivreLe: string;
  permisExpireLe: string;
  cinRectoUrl: string;
  cinVersoUrl: string;
  permisRectoUrl: string;
  permisVersoUrl: string;
  vip: boolean;
  remiseHabituels: number;
}

const DEFAULTS: ClientForm = {
  type: 'particulier',
  nom: '',
  prenom: '',
  telephone: '',
  email: '',
  documentType: 'cin',
  documentNumber: '',
  documentExpireLe: '',
  ville: '',
  permisNumero: '',
  permisCategorie: '',
  permisDelivreLe: '',
  permisExpireLe: '',
  cinRectoUrl: '',
  cinVersoUrl: '',
  permisRectoUrl: '',
  permisVersoUrl: '',
  vip: false,
  remiseHabituels: 0,
};

const documentUploadFields = [
  { key: 'cinRectoUrl', label: 'Carte nationale / document recto' },
  { key: 'cinVersoUrl', label: 'Carte nationale / document verso' },
  { key: 'permisRectoUrl', label: 'Permis recto' },
  { key: 'permisVersoUrl', label: 'Permis verso' },
] as const;

export default function NouveauClientPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const [form, setForm] = useState<ClientForm>(DEFAULTS);
  const [errors, setErrors] = useState<Partial<Record<keyof ClientForm, string>>>({});
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const set = (patch: Partial<ClientForm>) => setForm((prev) => ({ ...prev, ...patch }));

  const uploadDocument = async (field: keyof ClientForm, file: File) => {
    try {
      setUploadingField(String(field));
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'clients');

      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur upload document');

      set({ [field]: payload.data.url } as Partial<ClientForm>);
      toast.success('Pièce ajoutée, elle sera enregistrée avec le client');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Erreur upload');
    } finally {
      setUploadingField(null);
    }
  };

  const validate = () => {
    const next: Partial<Record<keyof ClientForm, string>> = {};
    if (!form.nom.trim()) next.nom = 'Nom requis';
    if (!form.telephone.trim()) next.telephone = 'Téléphone requis';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erreur lors de la création');
      return data;
    },
    onSuccess: (data) => {
      toast.success('Client créé');
      qc.invalidateQueries({ queryKey: ['clients'] });
      router.push(`/clients/${data.data._id}`);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <Sparkles className="h-3.5 w-3.5" /> nouveau dossier client
          </span>
          <h1 className="text-3xl font-bold text-cream">Créer un client</h1>
          <p className="mt-2 text-sm text-cream-muted">Ajoutez rapidement un nouveau profil avec une présentation nette et structurée.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/clients">
            <Button type="button" variant="outline">
              <ArrowLeft className="h-4 w-4" /> Retour
            </Button>
          </Link>
          <Button type="submit" variant="gold" disabled={mutation.isPending}>
            <Save className="h-4 w-4" /> {mutation.isPending ? 'Création...' : 'Créer le client'}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="lux-panel p-6 md:p-7">
          <h2 className="mb-5 text-lg font-semibold text-cream">Identité & contact</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Select label="Type" value={form.type} onChange={(e) => set({ type: e.target.value as ClientForm['type'] })}>
              <option value="particulier">Particulier</option>
              <option value="entreprise">Entreprise</option>
            </Select>
            <Input label="Ville" value={form.ville} onChange={(e) => set({ ville: e.target.value })} />
            <Input label="Nom *" value={form.nom} onChange={(e) => set({ nom: e.target.value })} error={errors.nom} />
            <Input label="Prénom" value={form.prenom} onChange={(e) => set({ prenom: e.target.value })} />
            <Input label="Téléphone *" value={form.telephone} onChange={(e) => set({ telephone: e.target.value })} error={errors.telephone} placeholder="+2126XXXXXXXX" />
            <Input label="Email" type="email" value={form.email} onChange={(e) => set({ email: e.target.value })} placeholder="optionnel" />
          </div>
        </section>

        <aside className="space-y-6">
          <section className="lux-panel p-6">
            <h2 className="mb-5 text-lg font-semibold text-cream">Document</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Select label="Type de document" value={form.documentType} onChange={(e) => set({ documentType: e.target.value as ClientForm['documentType'] })}>
                <option value="cin">CIN</option>
                <option value="passeport">Passeport</option>
                <option value="titre_sejour">Titre de séjour</option>
              </Select>
              <Input label="Numéro de document" value={form.documentNumber} onChange={(e) => set({ documentNumber: e.target.value })} />
              <Input label="Expiration du document" type="date" value={form.documentExpireLe} onChange={(e) => set({ documentExpireLe: e.target.value })} />
            </div>
          </section>

          <section className="lux-panel p-6">
            <h2 className="mb-5 text-lg font-semibold text-cream">Permis de conduire</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Input label="N° permis" value={form.permisNumero} onChange={(e) => set({ permisNumero: e.target.value })} />
              <Input label="Catégorie" value={form.permisCategorie} onChange={(e) => set({ permisCategorie: e.target.value })} placeholder="B, C..." />
              <Input label="Délivré le" type="date" value={form.permisDelivreLe} onChange={(e) => set({ permisDelivreLe: e.target.value })} />
              <Input label="Expire le" type="date" value={form.permisExpireLe} onChange={(e) => set({ permisExpireLe: e.target.value })} />
              <Input label="Remise habituelle (%)" type="number" min={0} max={100} value={String(form.remiseHabituels)} onChange={(e) => set({ remiseHabituels: Number(e.target.value || 0) })} />
              <div className="rounded-2xl border border-gold/10 bg-noir-root/50 px-4 py-3">
                <p className="text-sm font-medium text-cream">Profil VIP</p>
                <button
                  type="button"
                  role="switch"
                  aria-checked={form.vip}
                  onClick={() => set({ vip: !form.vip })}
                  className={`mt-3 relative h-6 w-11 rounded-full transition-colors ${form.vip ? 'bg-gold' : 'bg-noir-root border border-gold/20'}`}
                >
                  <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${form.vip ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </section>

          <section className="lux-panel-muted p-5">
            <p className="text-sm font-semibold text-cream">Conseil luxe</p>
            <p className="mt-2 text-sm text-cream-faint">
              Prenez directement les photos de la CIN et du permis depuis le téléphone pour constituer un dossier complet dès la création.
            </p>
          </section>
        </aside>
      </div>

      <section className="lux-panel p-6 md:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-cream">Pièces justificatives</h2>
            <p className="mt-1 text-sm text-cream-muted">Ajoutez la carte nationale et le permis via galerie, fichier ou appareil photo.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {documentUploadFields.map((item) => (
            <ClientDocumentUploadCard
              key={item.key}
              label={item.label}
              value={form[item.key]}
              uploading={uploadingField === item.key}
              helperText="La capture photo ouvre directement l'appareil photo sur mobile."
              onUpload={(file) => uploadDocument(item.key, file)}
              onValueChange={(value) => set({ [item.key]: value } as Partial<ClientForm>)}
            />
          ))}
        </div>
      </section>
    </form>
  );
}
