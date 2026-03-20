'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import { Button, Input, Select } from '@/components/ui';
import toast from 'react-hot-toast';

interface ClientForm {
  type: 'particulier' | 'entreprise';
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  documentType: 'cin' | 'passeport' | 'titre_sejour';
  documentNumber: string;
  ville: string;
  vip: boolean;
}

const DEFAULTS: ClientForm = {
  type: 'particulier',
  nom: '',
  prenom: '',
  telephone: '',
  email: '',
  documentType: 'cin',
  documentNumber: '',
  ville: '',
  vip: false,
};

export default function NouveauClientPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const [form, setForm] = useState<ClientForm>(DEFAULTS);
  const [errors, setErrors] = useState<Partial<Record<keyof ClientForm, string>>>({});

  const set = (patch: Partial<ClientForm>) => setForm((prev) => ({ ...prev, ...patch }));

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

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
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
            <div className="space-y-4">
              <Select label="Type de document" value={form.documentType} onChange={(e) => set({ documentType: e.target.value as ClientForm['documentType'] })}>
                <option value="cin">CIN</option>
                <option value="passeport">Passeport</option>
                <option value="titre_sejour">Titre de séjour</option>
              </Select>
              <Input label="Numéro de document" value={form.documentNumber} onChange={(e) => set({ documentNumber: e.target.value })} />
            </div>
          </section>

          <section className="lux-panel-muted p-5">
            <p className="text-sm font-semibold text-cream">Conseil luxe</p>
            <p className="mt-2 text-sm text-cream-faint">
              Un dossier client complet dès la création améliore la vitesse de confirmation et la qualité perçue côté agence.
            </p>
          </section>
        </aside>
      </div>
    </form>
  );
}
