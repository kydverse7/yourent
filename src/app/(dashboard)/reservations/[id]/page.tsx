'use client';

import Link from 'next/link';
import { use } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, CheckCircle2, FileSignature, Receipt, XCircle, Sparkles } from 'lucide-react';
import { Badge, Button, Skeleton } from '@/components/ui';
import { buildPdfViewerUrl, formatCurrency, formatDateTime } from '@/lib/utils';
import { useUIStore } from '@/stores/uiStore';
import toast from 'react-hot-toast';

export default function ReservationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const qc = useQueryClient();
  const openQuickPay = useUIStore((s) => s.openQuickPayModal);

  const { data, isLoading } = useQuery({
    queryKey: ['reservation', id],
    queryFn: async () => {
      const res = await fetch(`/api/reservations/${id}`);
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur');
      return payload.data;
    },
    initialData: () => {
      const cachedLists = qc.getQueriesData<{ data?: Array<Record<string, unknown>> }>({
        queryKey: ['reservations'],
      });

      for (const [, cached] of cachedLists) {
        const reservation = cached?.data?.find((item) => String(item._id) === id);
        if (reservation) return reservation;
      }

      return undefined;
    },
    staleTime: 30_000,
  });

  const reservation = data as any;

  const statusMutation = useMutation({
    mutationFn: async (statut: string) => {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statut }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur');
      return payload;
    },
    onSuccess: () => {
      toast.success('Statut mis à jour');
      qc.invalidateQueries({ queryKey: ['reservation', id] });
      qc.invalidateQueries({ queryKey: ['reservations'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const contractMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/contracts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityType: 'reservation', entityId: id }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur génération contrat');
      return payload.data as { url: string };
    },
    onSuccess: () => {
      toast.success('Contrat généré');
      qc.invalidateQueries({ queryKey: ['reservation', id] });
      qc.invalidateQueries({ queryKey: ['contracts'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const invoiceMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/invoices/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityType: 'reservation', entityId: id }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur génération facture');
      return payload.data as { url: string };
    },
    onSuccess: () => {
      toast.success('Facture générée');
      qc.invalidateQueries({ queryKey: ['reservation', id] });
      qc.invalidateQueries({ queryKey: ['invoices'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  if (isLoading) {
    return <Skeleton className="h-56 w-full" />;
  }

  if (!reservation) {
    return <div className="py-16 text-center text-cream-muted">Réservation introuvable.</div>;
  }

  const clientName = reservation.clientInline
    ? `${reservation.clientInline.prenom} ${reservation.clientInline.nom}`
    : `${reservation.client?.prenom ?? ''} ${reservation.client?.nom ?? ''}`.trim();

  return (
    <div className="space-y-6">
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <Sparkles className="h-3.5 w-3.5" /> fiche réservation
          </span>
          <h1 className="text-3xl font-bold text-cream">{clientName || 'Réservation'}</h1>
          <p className="mt-2 text-sm text-cream-muted">{reservation.vehicule?.marque} {reservation.vehicule?.modele}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/reservations">
            <Button variant="outline"><ArrowLeft className="h-4 w-4" /> Retour</Button>
          </Link>
          {reservation.statut !== 'refusee' && reservation.statut !== 'annulee' && (
            <Button variant="secondary" onClick={() => openQuickPay('reservation', id)}>
              Encaisser
            </Button>
          )}
          {reservation.statut === 'confirmee' && !reservation.location && (
            <Link href={`/locations/nouvelle?reservation=${reservation._id}`}>
              <Button variant="secondary">Démarrer la location</Button>
            </Link>
          )}
          {reservation.statut === 'en_attente' && (
            <>
              <Button variant="gold" onClick={() => statusMutation.mutate('confirmee')}>
                <CheckCircle2 className="h-4 w-4" /> Confirmer
              </Button>
              <Button variant="danger" onClick={() => statusMutation.mutate('refusee')}>
                <XCircle className="h-4 w-4" /> Refuser
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="lux-panel p-6 md:p-7">
          <h2 className="mb-5 text-lg font-semibold text-cream">Détails de la demande</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="lux-panel-muted p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Début</p>
              <p className="mt-2 text-sm text-cream">{formatDateTime(reservation.debutAt)}</p>
            </div>
            <div className="lux-panel-muted p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Fin</p>
              <p className="mt-2 text-sm text-cream">{formatDateTime(reservation.finAt)}</p>
            </div>
            <div className="lux-panel-muted p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Montant estimé</p>
              <p className="mt-2 text-sm font-semibold text-gold">{formatCurrency(reservation.prix?.totalEstime ?? reservation.tarifTotal ?? 0)}</p>
            </div>
            <div className="lux-panel-muted p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Statut</p>
              <div className="mt-2"><Badge variant={reservation.statut === 'confirmee' ? 'green' : reservation.statut === 'refusee' ? 'red' : 'amber'}>{reservation.statut}</Badge></div>
            </div>
            <div className="lux-panel-muted p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Déjà encaissé</p>
              <p className="mt-2 text-sm font-semibold text-green-300">{formatCurrency(reservation.montantPaye ?? 0)}</p>
            </div>
            <div className="lux-panel-muted p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">Reste à payer</p>
              <p className="mt-2 text-sm font-semibold text-amber-300">{formatCurrency(reservation.montantRestant ?? reservation.prix?.totalEstime ?? reservation.tarifTotal ?? 0)}</p>
            </div>
          </div>

          {reservation.notes && (
            <div className="mt-5 rounded-[22px] border border-white/8 bg-white/[0.03] p-4 text-sm text-cream-muted">
              {reservation.notes}
            </div>
          )}
        </section>

        <aside className="space-y-6">
          <section className="lux-panel p-6">
            <h2 className="mb-4 text-lg font-semibold text-cream">Coordonnées</h2>
            <div className="space-y-3 text-sm text-cream-muted">
              <p><span className="text-cream">Client :</span> {clientName}</p>
              <p><span className="text-cream">Téléphone :</span> {reservation.clientInline?.telephone ?? reservation.client?.telephone ?? '—'}</p>
              <p><span className="text-cream">Email :</span> {reservation.clientInline?.email ?? reservation.client?.email ?? '—'}</p>
            </div>
          </section>

          <section className="lux-panel-muted p-5">
            <p className="text-sm font-semibold text-cream">Suite logique</p>
            <p className="mt-2 text-sm text-cream-faint">Vous pouvez encaisser tout ou partie depuis la réservation. Au démarrage, la location reprend automatiquement le payé et le reste à payer.</p>
          </section>

          <section className="lux-panel p-6">
            <div className="mb-4 flex items-center gap-3">
              <FileSignature className="h-5 w-5 text-gold" />
              <h2 className="text-lg font-semibold text-cream">Contrat</h2>
            </div>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-gold">{reservation.contratNumero ?? 'Numéro à attribuer'}</p>
            <p className="text-sm text-cream-muted">
              {reservation.contratPdfUrl ? 'Un contrat PDF est déjà rattaché à cette réservation.' : 'Aucun contrat PDF n’est encore rattaché à cette réservation.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="outline" size="sm" disabled={contractMutation.isPending} onClick={() => contractMutation.mutate()}>
                {contractMutation.isPending ? 'Génération...' : 'Générer auto'}
              </Button>
              <Link href={`/contrats?entityType=reservation&entityId=${id}`}>
                <Button variant={reservation.contratPdfUrl ? 'outline' : 'gold'} size="sm">
                  {reservation.contratPdfUrl ? 'Gérer le contrat' : 'Ajouter un contrat'}
                </Button>
              </Link>
              {reservation.contratPdfUrl && (
                <a href={buildPdfViewerUrl(reservation.contratPdfUrl, `${reservation.contratNumero ?? 'contrat'}.pdf`)} target="_blank" rel="noreferrer">
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
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-gold">{reservation.factureNumero ?? 'Numéro à attribuer'}</p>
            <p className="text-sm text-cream-muted">
              {reservation.facturePdfUrl ? 'Une facture PDF est déjà rattachée à cette réservation.' : 'Aucune facture PDF n’est encore rattachée à cette réservation.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="outline" size="sm" disabled={invoiceMutation.isPending} onClick={() => invoiceMutation.mutate()}>
                {invoiceMutation.isPending ? 'Génération...' : 'Générer auto'}
              </Button>
              <Link href={`/factures?entityType=reservation&entityId=${id}`}>
                <Button variant={reservation.facturePdfUrl ? 'outline' : 'gold'} size="sm">
                  {reservation.facturePdfUrl ? 'Gérer la facture' : 'Ajouter une facture'}
                </Button>
              </Link>
              {reservation.facturePdfUrl && (
                <a href={buildPdfViewerUrl(reservation.facturePdfUrl, `${reservation.factureNumero ?? 'facture'}.pdf`)} target="_blank" rel="noreferrer">
                  <Button variant="secondary" size="sm">Ouvrir le PDF</Button>
                </a>
              )}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
