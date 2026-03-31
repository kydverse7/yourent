'use client';

import Link from 'next/link';
import { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, ClipboardCheck, CreditCard, FileSignature, Receipt, Shield, CheckCircle2, Sparkles } from 'lucide-react';
import { Button, Badge, Input, Skeleton } from '@/components/ui';
import { buildPdfViewerUrl, formatCurrency, formatDateTime } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';
import toast from 'react-hot-toast';

export default function LocationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const qc = useQueryClient();
  const openQuickPay = useUIStore((s) => s.openQuickPayModal);
  const openCaution = useUIStore((s) => s.openCautionModal);
  const openConfirm = useUIStore((s) => s.openConfirmModal);

  const { data, isLoading } = useQuery({
    queryKey: ['location', id],
    queryFn: async () => {
      const res = await fetch(`/api/locations/${id}`);
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur');
      return payload.data;
    },
    initialData: () => {
      const cachedLists = qc.getQueriesData<{ data?: Array<Record<string, unknown>> }>({
        queryKey: ['locations'],
      });

      for (const [, cached] of cachedLists) {
        const location = cached?.data?.find((item) => String(item._id) === id);
        if (location) return location;
      }

      return undefined;
    },
    staleTime: 30_000,
  });

  const location = data as any;
  const kmRetourDefault = location?.vehicule?.kilometrage ?? 0;

  const closeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/locations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kmRetour: kmRetourDefault,
          finAt: new Date().toISOString(),
          notes: 'Clôture depuis la fiche location',
        }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur');
      return payload;
    },
    onSuccess: () => {
      toast.success('Location clôturée');
      qc.invalidateQueries({ queryKey: ['location', id] });
      qc.invalidateQueries({ queryKey: ['locations'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const contractMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/contracts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityType: 'location', entityId: id }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur génération contrat');
      return payload.data as { url: string };
    },
    onSuccess: () => {
      toast.success('Contrat généré');
      qc.invalidateQueries({ queryKey: ['location', id] });
      qc.invalidateQueries({ queryKey: ['contracts'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const invoiceMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/invoices/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityType: 'location', entityId: id }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur génération facture');
      return payload.data as { url: string };
    },
    onSuccess: () => {
      toast.success('Facture générée');
      qc.invalidateQueries({ queryKey: ['location', id] });
      qc.invalidateQueries({ queryKey: ['invoices'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (isLoading) {
    return <Skeleton className="h-56 w-full" />;
  }

  if (!location) {
    return <div className="py-16 text-center text-cream-muted">Location introuvable.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <Sparkles className="h-3.5 w-3.5" /> fiche location
          </span>
          <h1 className="text-3xl font-bold text-cream">{location.vehicule?.marque} {location.vehicule?.modele}</h1>
          <p className="mt-2 text-sm text-cream-muted">{location.client?.prenom} {location.client?.nom} · {location.client?.telephone}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/locations">
            <Button variant="outline"><ArrowLeft className="h-4 w-4" /> Retour</Button>
          </Link>
          {!location.etatDesLieuxAvantId ? (
            <Link href={`/etat-des-lieux?location=${id}&moment=avant`}>
              <Button variant="gold">
                <ClipboardCheck className="h-4 w-4" /> EDL départ
              </Button>
            </Link>
          ) : !location.etatDesLieuxApresId ? (
            <Link href={`/etat-des-lieux?location=${id}&moment=apres`}>
              <Button variant="secondary">
                <ClipboardCheck className="h-4 w-4" /> EDL retour
              </Button>
            </Link>
          ) : null}
          <Button variant="secondary" onClick={() => openQuickPay('location', id)}>
            <CreditCard className="h-4 w-4" /> Paiement rapide
          </Button>
          <Button variant="outline" onClick={() => openCaution(id)}>
            <Shield className="h-4 w-4" /> Caution
          </Button>
          {location.statut === 'en_cours' && (
            <Button
              variant="gold"
              onClick={() =>
                openConfirm({
                  title: 'Clôturer cette location ?',
                  description: 'Le véhicule repassera disponible et la location sera marquée terminée.',
                  onConfirm: () => closeMutation.mutate(),
                })
              }
            >
              <CheckCircle2 className="h-4 w-4" /> Clôturer
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="lux-panel p-6 md:p-7">
          <h2 className="mb-5 text-lg font-semibold text-cream">Détails opérationnels</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="lux-panel-muted p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Début</p>
              <p className="mt-2 text-sm text-cream">{formatDateTime(location.debutAt)}</p>
            </div>
            <div className="lux-panel-muted p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Fin prévue</p>
              <p className="mt-2 text-sm text-cream">{formatDateTime(location.finPrevueAt)}</p>
            </div>
            <div className="lux-panel-muted p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Tarif / jour</p>
              <p className="mt-2 text-sm font-semibold text-gold">{formatCurrency(location.tarifJour ?? 0)}</p>
            </div>
            <div className="lux-panel-muted p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Montant total</p>
              <p className="mt-2 text-sm font-semibold text-gold">{formatCurrency(location.montantTotal ?? 0)}</p>
            </div>
            <div className="lux-panel-muted p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Statut</p>
              <div className="mt-2"><Badge variant={location.statut === 'terminee' ? 'green' : 'blue'}>{location.statut}</Badge></div>
            </div>
              <div className="lux-panel-muted p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Encaissé</p>
                <p className="mt-2 text-sm font-semibold text-green-300">{formatCurrency(location.montantPaye ?? 0)}</p>
              </div>
              <div className="lux-panel-muted p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Reste à payer</p>
                <p className="mt-2 text-sm font-semibold text-amber-300">{formatCurrency(location.montantRestant ?? 0)}</p>
              </div>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="lux-panel p-6">
            <h2 className="mb-4 text-lg font-semibold text-cream">Client</h2>
            <div className="space-y-3 text-sm text-cream-muted">
              <p><span className="text-cream">Nom :</span> {location.client?.prenom} {location.client?.nom}</p>
              <p><span className="text-cream">Téléphone :</span> {location.client?.telephone}</p>
              <p><span className="text-cream">Véhicule :</span> {location.vehicule?.immatriculation}</p>
            </div>
          </section>

          <section className="lux-panel p-6">
            <div className="mb-4 flex items-center gap-3">
              <Shield className="h-5 w-5 text-gold" />
              <h2 className="text-lg font-semibold text-cream">Caution</h2>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="lux-panel-muted p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Montant</p>
                <p className="mt-2 text-sm font-semibold text-gold">{formatCurrency(location.cautionMontant ?? 0)}</p>
              </div>
              <div className="lux-panel-muted p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Statut</p>
                <p className="mt-2 text-sm text-cream">{location.cautionStatut ?? 'en_attente'}</p>
              </div>
              <div className="lux-panel-muted p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Mode de prise</p>
                <p className="mt-2 text-sm text-cream">
                  {location.caution?.typePrise === 'cheque'
                    ? 'Chèque'
                    : location.caution?.typePrise === 'carte_empreinte'
                      ? 'Empreinte carte via TPE agence'
                      : location.caution?.typePrise === 'cash'
                        ? 'Espèces'
                        : 'Non défini'}
                </p>
              </div>
              <div className="lux-panel-muted p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Référence</p>
                <p className="mt-2 text-sm text-cream">{location.caution?.referenceDoc ?? '—'}</p>
              </div>
            </div>
          </section>

          <section className="lux-panel p-6">
            <div className="mb-4 flex items-center gap-3">
              <FileSignature className="h-5 w-5 text-gold" />
              <h2 className="text-lg font-semibold text-cream">Contrat</h2>
            </div>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-gold">{location.contratNumero ?? 'Numéro à attribuer'}</p>
            <p className="text-sm text-cream-muted">
              {location.contratPdfUrl ? 'Un contrat est rattaché à cette location.' : 'Aucun contrat PDF n’est encore rattaché à cette location.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="outline" size="sm" disabled={contractMutation.isPending} onClick={() => contractMutation.mutate()}>
                {contractMutation.isPending ? 'Génération...' : 'Générer auto'}
              </Button>
              <Link href={`/contrats?entityType=location&entityId=${id}`}>
                <Button variant={location.contratPdfUrl ? 'outline' : 'gold'} size="sm">
                  {location.contratPdfUrl ? 'Gérer le contrat' : 'Ajouter un contrat'}
                </Button>
              </Link>
              {location.contratPdfUrl && (
                <a href={buildPdfViewerUrl(location.contratPdfUrl, `${location.contratNumero ?? 'contrat'}.pdf`)} target="_blank" rel="noreferrer">
                  <Button variant="secondary" size="sm">Ouvrir le PDF</Button>
                </a>
              )}
            </div>
          </section>

          <section className="lux-panel p-6">
            <div className="mb-4 flex items-center gap-3">
              <Receipt className="h-5 w-5 text-gold" />
              <h2 className="text-lg font-semibold text-cream">Facture</h2>
            </div>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-gold">{location.factureNumero ?? 'Numéro à attribuer'}</p>
            <p className="text-sm text-cream-muted">
              {location.facturePdfUrl ? 'Une facture est rattachée à cette location.' : 'Aucune facture PDF n’est encore rattachée à cette location.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="outline" size="sm" disabled={invoiceMutation.isPending} onClick={() => invoiceMutation.mutate()}>
                {invoiceMutation.isPending ? 'Génération...' : 'Générer auto'}
              </Button>
              <Link href={`/factures?entityType=location&entityId=${id}`}>
                <Button variant={location.facturePdfUrl ? 'outline' : 'gold'} size="sm">
                  {location.facturePdfUrl ? 'Gérer la facture' : 'Ajouter une facture'}
                </Button>
              </Link>
              {location.facturePdfUrl && (
                <a href={buildPdfViewerUrl(location.facturePdfUrl, `${location.factureNumero ?? 'facture'}.pdf`)} target="_blank" rel="noreferrer">
                  <Button variant="secondary" size="sm">Ouvrir le PDF</Button>
                </a>
              )}
            </div>
          </section>

          <section className="lux-panel p-6">
            <div className="mb-4 flex items-center gap-3">
              <ClipboardCheck className="h-5 w-5 text-gold" />
              <h2 className="text-lg font-semibold text-cream">États des lieux</h2>
            </div>

            <div className="space-y-3">
              <div className="lux-panel-muted p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-cream">Départ</p>
                    <p className="mt-1 text-xs text-cream-muted">
                      {location.etatDesLieuxAvantId
                        ? `Créé le ${formatDateTime(location.etatDesLieuxAvantId.createdAt)}`
                        : 'Aucun état des lieux de départ enregistré.'}
                    </p>
                  </div>
                  <Link href={`/etat-des-lieux?location=${id}&moment=avant`}>
                    <Button variant={location.etatDesLieuxAvantId ? 'outline' : 'gold'} size="sm">
                      {location.etatDesLieuxAvantId ? 'Voir / refaire' : 'Créer'}
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lux-panel-muted p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-cream">Retour</p>
                    <p className="mt-1 text-xs text-cream-muted">
                      {location.etatDesLieuxApresId
                        ? `Créé le ${formatDateTime(location.etatDesLieuxApresId.createdAt)}`
                        : 'Aucun état des lieux de retour enregistré.'}
                    </p>
                  </div>
                  <Link href={`/etat-des-lieux?location=${id}&moment=apres`}>
                    <Button variant={location.etatDesLieuxApresId ? 'outline' : 'secondary'} size="sm">
                      {location.etatDesLieuxApresId ? 'Voir / refaire' : 'Créer'}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="lux-panel-muted p-5">
            <p className="mb-2 text-sm font-semibold text-cream">Clôture rapide</p>
            <Input label="Kilométrage retour (indicatif)" type="number" defaultValue={String(kmRetourDefault)} disabled />
          </section>
        </aside>
      </div>
    </div>
  );
}
