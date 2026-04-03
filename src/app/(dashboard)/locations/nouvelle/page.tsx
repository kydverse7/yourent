'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft,
  ArrowRight,
  Car,
  CheckCircle2,
  Plus,
  Search,
  Sparkles,
  User,
  UserPlus,
} from 'lucide-react';
import { Badge, Button, Input, Select, Skeleton } from '@/components/ui';
import { formatCurrency, formatDateTime } from '@/lib/utils';
import toast from 'react-hot-toast';

/* ──────── types ──────── */

type ClientItem = {
  _id: string;
  nom: string;
  prenom?: string;
  telephone: string;
  email?: string;
  documentType?: string;
  documentNumber?: string;
  type?: string;
};

type VehicleItem = {
  _id: string;
  marque: string;
  modele: string;
  immatriculation: string;
  annee?: number;
  statut: string;
  categorie?: string;
  type?: string;
  couleur?: string;
  kilometrage?: number;
  carburant?: string;
  transmission?: string;
  boite?: string;
  places?: number;
  tarifJour?: number;
  tarifJour10Plus?: number;
  photos?: string[];
  backgroundPhoto?: string;
  photoModele?: string;
  cautionMontant?: number;
  cautionDefaut?: number;
};

type ReservationListItem = {
  _id: string;
  client?: { _id?: string; prenom?: string; nom?: string; telephone?: string };
  clientInline?: { prenom?: string; nom?: string; telephone?: string };
  vehicule?: {
    _id: string;
    marque?: string;
    modele?: string;
    immatriculation?: string;
    kilometrage?: number;
    cautionMontant?: number;
    cautionDefaut?: number;
  };
  debutAt: string;
  finAt: string;
  tarifTotal?: number;
  prix?: { totalEstime?: number };
  montantPaye?: number;
  montantRestant?: number;
  statut: string;
  location?: string | null;
};

type CautionType = 'cheque' | 'carte_empreinte' | 'cash';
type Mode = 'direct' | 'reservation';
type Step = 1 | 2 | 3 | 4;

/* ──────── helpers ──────── */

function getClientName(c: ClientItem | null | undefined) {
  if (!c) return '—';
  return `${c.prenom ?? ''} ${c.nom ?? ''}`.trim() || '—';
}

function getReservationClientName(r: ReservationListItem) {
  if (r.clientInline)
    return `${r.clientInline.prenom ?? ''} ${r.clientInline.nom ?? ''}`.trim();
  return (
    `${r.client?.prenom ?? ''} ${r.client?.nom ?? ''}`.trim() || '—'
  );
}

function getVehiclePhoto(v: VehicleItem) {
  return v.backgroundPhoto || v.photoModele || v.photos?.[0] || null;
}

function calcNbJoursLocal(debut: string, fin: string) {
  if (!debut || !fin) return 0;
  const d = new Date(debut);
  const f = new Date(fin);
  // Nombre de jours calendaires (ex: 3 avril → 6 avril = 3 jours)
  const startDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const endDay = new Date(f.getFullYear(), f.getMonth(), f.getDate());
  const diff = endDay.getTime() - startDay.getTime();
  return Math.max(1, Math.round(diff / 86400000));
}

/* ──────── Stepper ──────── */

const STEPS = [
  { n: 1, label: 'Client' },
  { n: 2, label: 'Véhicule' },
  { n: 3, label: 'Dates & km' },
  { n: 4, label: 'Caution & confirmation' },
] as const;

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {STEPS.map(({ n, label }, idx) => (
        <div key={n} className="flex items-center gap-2 shrink-0">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
              n < current
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : n === current
                  ? 'bg-gold/20 text-gold border border-gold/40'
                  : 'bg-white/5 text-cream-faint border border-white/10'
            }`}
          >
            {n < current ? <CheckCircle2 className="h-4 w-4" /> : n}
          </div>
          <span
            className={`text-xs font-medium ${n === current ? 'text-gold' : 'text-cream-faint'}`}
          >
            {label}
          </span>
          {idx < STEPS.length - 1 && (
            <div className="mx-1 h-px w-6 bg-white/10" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ──────── Inline Client Form ──────── */

function InlineClientForm({
  onCreated,
  onCancel,
}: {
  onCreated: (client: ClientItem) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    type: 'particulier' as 'particulier' | 'entreprise',
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    documentType: 'cin' as 'cin' | 'passeport' | 'titre_sejour',
    documentNumber: '',
    ville: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (p: Partial<typeof form>) =>
    setForm((prev) => ({ ...prev, ...p }));

  const mutation = useMutation({
    mutationFn: async () => {
      const e: Record<string, string> = {};
      if (!form.nom.trim()) e.nom = 'Nom requis';
      if (!form.telephone.trim()) e.telephone = 'Téléphone requis';
      setErrors(e);
      if (Object.keys(e).length > 0) throw new Error('Champs manquants');

      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erreur');
      return data.data as ClientItem;
    },
    onSuccess: (client) => {
      toast.success('Client créé');
      onCreated(client);
    },
    onError: (err: Error) => {
      if (err.message !== 'Champs manquants') toast.error(err.message);
    },
  });

  return (
    <div className="space-y-4 rounded-2xl border border-gold/15 bg-gold/5 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gold">
          Créer un nouveau client
        </h3>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Annuler
        </Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Select
          label="Type"
          value={form.type}
          onChange={(e) => set({ type: e.target.value as typeof form.type })}
        >
          <option value="particulier">Particulier</option>
          <option value="entreprise">Entreprise</option>
        </Select>
        <Input
          label="Nom *"
          value={form.nom}
          onChange={(e) => set({ nom: e.target.value })}
          error={errors.nom}
        />
        <Input
          label="Prénom"
          value={form.prenom}
          onChange={(e) => set({ prenom: e.target.value })}
        />
        <Input
          label="Téléphone *"
          value={form.telephone}
          onChange={(e) => set({ telephone: e.target.value })}
          error={errors.telephone}
          placeholder="+2126XXXXXXXX"
        />
        <Input
          label="Email"
          value={form.email}
          onChange={(e) => set({ email: e.target.value })}
        />
        <Input
          label="Ville"
          value={form.ville}
          onChange={(e) => set({ ville: e.target.value })}
        />
        <Select
          label="Type de document"
          value={form.documentType}
          onChange={(e) =>
            set({ documentType: e.target.value as typeof form.documentType })
          }
        >
          <option value="cin">CIN</option>
          <option value="passeport">Passeport</option>
          <option value="titre_sejour">Titre de séjour</option>
        </Select>
        <Input
          label="N° document"
          value={form.documentNumber}
          onChange={(e) => set({ documentNumber: e.target.value })}
        />
      </div>
      <div className="flex justify-end">
        <Button
          variant="gold"
          size="sm"
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          <UserPlus className="h-3.5 w-3.5" />
          {mutation.isPending ? 'Création…' : 'Créer & sélectionner'}
        </Button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════ */

export default function NouvelleLocationPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const searchParams = useSearchParams();

  const reservationParam = searchParams.get('reservation');
  const [mode, setMode] = useState<Mode>(
    reservationParam ? 'reservation' : 'direct',
  );

  /* ── direct-mode state ── */
  const [step, setStep] = useState<Step>(1);
  const [clientSearch, setClientSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState<ClientItem | null>(null);
  const [showNewClient, setShowNewClient] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleItem | null>(
    null,
  );
  const [debutAt, setDebutAt] = useState(
    new Date().toISOString().slice(0, 16),
  );
  const [finPrevueAt, setFinPrevueAt] = useState('');
  const [kmDepart, setKmDepart] = useState('');
  const [cautionType, setCautionType] = useState<CautionType>('cheque');
  const [cautionReference, setCautionReference] = useState('');

  /* ── reservation-mode state ── */
  const [selectedReservationId, setSelectedReservationId] = useState(
    reservationParam ?? '',
  );

  /* ════════ QUERIES ════════ */

  const { data: clientsData, isLoading: loadingClients } = useQuery({
    queryKey: ['clients-search', clientSearch],
    queryFn: async () => {
      const p = new URLSearchParams({ page: '1', limit: '50' });
      if (clientSearch.trim()) p.set('q', clientSearch.trim());
      const res = await fetch(`/api/clients?${p}`);
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur');
      return payload.data as ClientItem[];
    },
    enabled: mode === 'direct',
  });
  const clients = clientsData ?? [];

  const { data: vehiclesData, isLoading: loadingVehicles } = useQuery({
    queryKey: ['vehicles-available'],
    queryFn: async () => {
      const res = await fetch('/api/vehicles?grouped=true');
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur');
      return payload.data as {
        groups: {
          marque: string;
          modele: string;
          type: string;
          vehicles: VehicleItem[];
        }[];
        total: number;
      };
    },
    enabled: mode === 'direct',
  });
  const vehicleGroups = vehiclesData?.groups ?? [];

  const { data: reservationsData, isLoading: loadingReservations } = useQuery({
    queryKey: ['reservations-startable'],
    queryFn: async () => {
      const res = await fetch(
        '/api/reservations?statut=confirmee&page=1&limit=100',
      );
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur');
      return payload.data as ReservationListItem[];
    },
    enabled: mode === 'reservation',
  });
  const availableReservations = useMemo(
    () => (reservationsData ?? []).filter((r) => !r.location),
    [reservationsData],
  );

  useEffect(() => {
    if (
      mode === 'reservation' &&
      !selectedReservationId &&
      availableReservations.length > 0
    ) {
      setSelectedReservationId(availableReservations[0]._id);
    }
  }, [availableReservations, selectedReservationId, mode]);

  const selectedReservation = useMemo(
    () => availableReservations.find((r) => r._id === selectedReservationId),
    [availableReservations, selectedReservationId],
  );

  /* ════════ COMPUTED ════════ */

  const isRetroactive = !!(finPrevueAt && new Date(finPrevueAt) < new Date());

  const nbJours = calcNbJoursLocal(debutAt, finPrevueAt);
  const tarifJour = selectedVehicle
    ? nbJours >= 10
      ? selectedVehicle.tarifJour10Plus || selectedVehicle.tarifJour || 0
      : selectedVehicle.tarifJour || 0
    : 0;
  const montantTotal = tarifJour * nbJours;
  const cautionAmount =
    selectedVehicle?.cautionMontant ?? selectedVehicle?.cautionDefaut ?? 0;
  const cautionReferenceRequired =
    cautionAmount > 0 && cautionType === 'cheque';
  const cautionReferenceMissing =
    cautionReferenceRequired && !cautionReference.trim();

  // Pre-fill km from vehicle
  useEffect(() => {
    if (selectedVehicle && !kmDepart) {
      setKmDepart(String(selectedVehicle.kilometrage ?? 0));
    }
  }, [selectedVehicle, kmDepart]);

  /* ════════ MUTATIONS ════════ */

  // Direct mode
  const createDirect = useMutation({
    mutationFn: async () => {
      if (!selectedClient) throw new Error('Client requis');
      if (!selectedVehicle) throw new Error('Véhicule requis');
      if (!debutAt || !finPrevueAt) throw new Error('Dates requises');

      const cautionPayload =
        cautionAmount > 0
          ? {
              montant: cautionAmount,
              typePrise: cautionType,
              ...(cautionType === 'cheque' && cautionReference.trim()
                ? { referenceDoc: cautionReference.trim() }
                : {}),
            }
          : undefined;

      const res = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicle: selectedVehicle._id,
          client: selectedClient._id,
          debutAt: new Date(debutAt).toISOString(),
          finPrevueAt: new Date(finPrevueAt).toISOString(),
          kmDepart: Number(kmDepart) || 0,
          mode: 'direct',
          ...(isRetroactive ? { retroactive: true } : {}),
          ...(cautionPayload ? { caution: cautionPayload } : {}),
        }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur création');
      return payload.data;
    },
    onSuccess: (loc) => {
      toast.success(isRetroactive ? 'Location rétroactive enregistrée' : 'Location démarrée');
      qc.invalidateQueries({ queryKey: ['locations'] });
      qc.invalidateQueries({ queryKey: ['vehicles'] });
      router.push(`/locations/${loc._id}`);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  // Reservation mode
  const createFromReservation = useMutation({
    mutationFn: async () => {
      if (!selectedReservation)
        throw new Error('Aucune réservation');
      if (!selectedReservation.client?._id)
        throw new Error('Réservation sans client');
      if (!selectedReservation.vehicule?._id)
        throw new Error('Réservation sans véhicule');

      const resCaution =
        selectedReservation.vehicule.cautionMontant ??
        selectedReservation.vehicule.cautionDefaut ??
        0;
      const cautionPayload =
        resCaution > 0
          ? {
              montant: resCaution,
              typePrise: cautionType,
              ...(cautionType === 'cheque' && cautionReference.trim()
                ? { referenceDoc: cautionReference.trim() }
                : {}),
            }
          : undefined;

      const res = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reservation: selectedReservation._id,
          vehicle: selectedReservation.vehicule._id,
          client: selectedReservation.client._id,
          debutAt: selectedReservation.debutAt,
          finPrevueAt: selectedReservation.finAt,
          kmDepart: selectedReservation.vehicule.kilometrage ?? 0,
          ...(cautionPayload ? { caution: cautionPayload } : {}),
        }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur création');
      return payload.data;
    },
    onSuccess: (loc) => {
      toast.success('Location démarrée');
      qc.invalidateQueries({ queryKey: ['locations'] });
      qc.invalidateQueries({ queryKey: ['reservations'] });
      router.push(`/locations/${loc._id}`);
    },
    onError: (err: Error) => toast.error(err.message),
  });

  /* ═══════════════ RENDER ═══════════════ */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="lux-page-head">
        <div>
          <span className="lux-eyebrow mb-3">
            <Sparkles className="h-3.5 w-3.5" /> démarrage de contrat
          </span>
          <h1 className="text-3xl font-bold text-cream">Nouvelle location</h1>
          <p className="mt-2 text-sm text-cream-muted">
            {mode === 'direct'
              ? 'Créez une location directement en choisissant un client et un véhicule.'
              : 'Transformez une réservation confirmée en location active.'}
          </p>
        </div>
        <Link href="/locations">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4" /> Retour aux locations
          </Button>
        </Link>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('direct')}
          className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
            mode === 'direct'
              ? 'bg-gold text-noir-root'
              : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
          }`}
        >
          Location directe
        </button>
        <button
          onClick={() => setMode('reservation')}
          className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
            mode === 'reservation'
              ? 'bg-gold text-noir-root'
              : 'border border-white/8 bg-white/5 text-cream-muted hover:text-cream'
          }`}
        >
          Depuis réservation
        </button>
      </div>

      {/* ═══ DIRECT MODE ═══ */}
      {mode === 'direct' && (
        <div className="space-y-6">
          <StepIndicator current={step} />

          {/* ── STEP 1 : CLIENT ── */}
          {step === 1 && (
            <section className="lux-panel p-6 md:p-7 space-y-5">
              <div>
                <h2 className="text-lg font-semibold text-cream flex items-center gap-2">
                  <User className="h-5 w-5 text-gold" /> Choisir un client
                </h2>
                <p className="mt-1 text-sm text-cream-muted">
                  Recherchez un client existant ou créez-en un nouveau.
                </p>
              </div>

              {!showNewClient && (
                <>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        placeholder="Rechercher par nom, téléphone, email…"
                        value={clientSearch}
                        onChange={(e) => setClientSearch(e.target.value)}
                        leftIcon={<Search className="h-4 w-4" />}
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => setShowNewClient(true)}
                    >
                      <Plus className="h-4 w-4" /> Nouveau client
                    </Button>
                  </div>

                  {loadingClients ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                      ))}
                    </div>
                  ) : clients.length === 0 ? (
                    <p className="text-sm text-cream-muted py-6 text-center">
                      Aucun client trouvé.
                    </p>
                  ) : (
                    <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                      {clients.map((c) => (
                        <button
                          key={c._id}
                          onClick={() => setSelectedClient(c)}
                          className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-all ${
                            selectedClient?._id === c._id
                              ? 'border border-gold/30 bg-gold/10'
                              : 'border border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'
                          }`}
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 shrink-0">
                            <User className="h-4 w-4 text-gold/60" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-cream">
                              {getClientName(c)}
                            </p>
                            <p className="text-xs text-cream-muted">
                              {c.telephone}
                              {c.email ? ` · ${c.email}` : ''}
                            </p>
                          </div>
                          {c.documentNumber && (
                            <span className="text-[10px] text-cream-faint uppercase">
                              {c.documentType} {c.documentNumber}
                            </span>
                          )}
                          {selectedClient?._id === c._id && (
                            <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              {showNewClient && (
                <InlineClientForm
                  onCreated={(c) => {
                    setSelectedClient(c);
                    setShowNewClient(false);
                    qc.invalidateQueries({ queryKey: ['clients-search'] });
                  }}
                  onCancel={() => setShowNewClient(false)}
                />
              )}

              {selectedClient && !showNewClient && (
                <div className="flex items-center justify-between rounded-2xl border border-gold/15 bg-gold/5 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-gold/70">
                      Client sélectionné
                    </p>
                    <p className="mt-1 text-sm font-semibold text-cream">
                      {getClientName(selectedClient)}
                    </p>
                    <p className="text-xs text-cream-muted">
                      {selectedClient.telephone}
                    </p>
                  </div>
                  <Button
                    variant="gold"
                    size="sm"
                    onClick={() => setStep(2)}
                  >
                    Suivant <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </section>
          )}

          {/* ── STEP 2 : VEHICLE ── */}
          {step === 2 && (
            <section className="lux-panel p-6 md:p-7 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-cream flex items-center gap-2">
                    <Car className="h-5 w-5 text-gold" /> Choisir un véhicule
                    disponible
                  </h2>
                  <p className="mt-1 text-sm text-cream-muted">
                    Seuls les véhicules disponibles sont proposés.
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-3.5 w-3.5" /> Client
                </Button>
              </div>

              {loadingVehicles ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : vehicleGroups.length === 0 ? (
                <p className="text-sm text-cream-muted py-6 text-center">
                  Aucun véhicule disponible.
                </p>
              ) : (
                <div className="max-h-[28rem] overflow-y-auto space-y-2 pr-1">
                  {vehicleGroups.map((group) =>
                    group.vehicles.map((v) => {
                        const photo = getVehiclePhoto(v);
                        const isSelected = selectedVehicle?._id === v._id;
                        const indisponible = v.statut !== 'disponible';
                        return (
                          <button
                            key={v._id}
                            onClick={() => {
                              setSelectedVehicle(v);
                              setKmDepart(String(v.kilometrage ?? 0));
                            }}
                            className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition-all ${
                              isSelected
                                ? 'border border-gold/30 bg-gold/10'
                                : 'border border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'
                            } ${indisponible ? 'opacity-60' : ''}`}
                          >
                            <div className="shrink-0">
                              {photo ? (
                                <Image
                                  src={photo}
                                  alt=""
                                  width={72}
                                  height={48}
                                  className="rounded-lg object-cover"
                                />
                              ) : (
                                <div className="flex h-12 w-[72px] items-center justify-center rounded-lg bg-gold/10">
                                  <Car className="h-5 w-5 text-gold/40" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-semibold text-cream">
                                {v.marque} {v.modele}
                              </p>
                              <p className="mt-0.5 text-xs text-cream-muted">
                                {v.immatriculation} · {v.annee ?? ''} ·{' '}
                                {(v.kilometrage ?? 0).toLocaleString('fr-FR')}{' '}
                                km
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-sm font-semibold text-gold">
                                {formatCurrency(v.tarifJour ?? 0)}/j
                              </p>
                              {indisponible && (
                                <p className="text-[10px] font-medium text-amber-400">
                                  {v.statut === 'loue' ? 'Loué' : v.statut === 'maintenance' ? 'Maintenance' : v.statut}
                                </p>
                              )}
                              {(v.tarifJour10Plus ?? 0) > 0 &&
                                (v.tarifJour10Plus ?? 0) !==
                                  (v.tarifJour ?? 0) && (
                                  <p className="text-[10px] text-cream-faint">
                                    11+ j :{' '}
                                    {formatCurrency(v.tarifJour10Plus ?? 0)}
                                  </p>
                                )}
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="h-5 w-5 text-gold shrink-0" />
                            )}
                          </button>
                        );
                      }),
                  )}
                </div>
              )}

              {selectedVehicle && (
                <div className="flex items-center justify-between rounded-2xl border border-gold/15 bg-gold/5 p-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-gold/70">
                      Véhicule sélectionné
                    </p>
                    <p className="mt-1 text-sm font-semibold text-cream">
                      {selectedVehicle.marque} {selectedVehicle.modele} —{' '}
                      {selectedVehicle.immatriculation}
                    </p>
                  </div>
                  <Button
                    variant="gold"
                    size="sm"
                    onClick={() => setStep(3)}
                  >
                    Suivant <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </section>
          )}

          {/* ── STEP 3 : DATES & KM ── */}
          {step === 3 && (
            <section className="lux-panel p-6 md:p-7 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-cream">
                    Période & kilométrage
                  </h2>
                  <p className="mt-1 text-sm text-cream-muted">
                    Définissez les dates de début et fin prévue de la location.
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setStep(2)}>
                  <ArrowLeft className="h-3.5 w-3.5" /> Véhicule
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Input
                  label="Date de début"
                  type="datetime-local"
                  value={debutAt}
                  onChange={(e) => setDebutAt(e.target.value)}
                />
                <Input
                  label="Date de fin prévue"
                  type="datetime-local"
                  value={finPrevueAt}
                  onChange={(e) => setFinPrevueAt(e.target.value)}
                />
                <Input
                  label="Kilométrage départ"
                  type="number"
                  min={0}
                  value={kmDepart}
                  onChange={(e) => setKmDepart(e.target.value)}
                />
              </div>

              {isRetroactive && (
                <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                  <strong>Location rétroactive</strong> — Les dates sont dans le passé. La location sera enregistrée avec le statut <em>terminée</em>.
                </div>
              )}

              {debutAt && finPrevueAt && selectedVehicle && (
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="lux-panel-muted p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                      Durée
                    </p>
                    <p className="mt-2 text-lg font-semibold text-cream">
                      {nbJours} jour{nbJours > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="lux-panel-muted p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                      Tarif / jour
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gold">
                      {formatCurrency(tarifJour)}
                    </p>
                    {nbJours >= 10 && (
                      <p className="text-[10px] text-cream-faint">
                        palier 11+ jours
                      </p>
                    )}
                  </div>
                  <div className="lux-panel-muted p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                      Total estimé
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gold">
                      {formatCurrency(montantTotal)}
                    </p>
                  </div>
                </div>
              )}

              {debutAt && finPrevueAt && nbJours > 0 && (
                <div className="flex justify-end">
                  <Button
                    variant="gold"
                    size="sm"
                    onClick={() => setStep(4)}
                  >
                    Suivant <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </section>
          )}

          {/* ── STEP 4 : CAUTION & CONFIRM ── */}
          {step === 4 && (
            <section className="lux-panel p-6 md:p-7 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-cream">
                    Caution & récapitulatif
                  </h2>
                  <p className="mt-1 text-sm text-cream-muted">
                    Vérifiez les informations et confirmez{isRetroactive ? ' l\'enregistrement' : ' le démarrage'}.
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setStep(3)}>
                  <ArrowLeft className="h-3.5 w-3.5" /> Période
                </Button>
              </div>

              {/* Summary */}
              <div className="grid gap-3 md:grid-cols-2">
                <div className="lux-panel-muted p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                    Client
                  </p>
                  <p className="mt-2 text-sm font-medium text-cream">
                    {getClientName(selectedClient)}
                  </p>
                  <p className="text-xs text-cream-muted">
                    {selectedClient?.telephone}
                  </p>
                </div>
                <div className="lux-panel-muted p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                    Véhicule
                  </p>
                  <p className="mt-2 text-sm font-medium text-cream">
                    {selectedVehicle?.marque} {selectedVehicle?.modele}
                  </p>
                  <p className="text-xs text-cream-muted">
                    {selectedVehicle?.immatriculation}
                  </p>
                </div>
                <div className="lux-panel-muted p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                    Période
                  </p>
                  <p className="mt-2 text-sm text-cream">
                    {formatDateTime(debutAt)}
                  </p>
                  <p className="text-sm text-cream">
                    {'→'} {formatDateTime(finPrevueAt)}
                  </p>
                  <p className="mt-1 text-xs text-cream-muted">
                    {nbJours} jour{nbJours > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="lux-panel-muted p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                    Montant total
                  </p>
                  <p className="mt-2 text-lg font-semibold text-gold">
                    {formatCurrency(montantTotal)}
                  </p>
                </div>
              </div>

              {/* Caution */}
              {cautionAmount > 0 && (
                <>
                  <div className="lux-panel-muted p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                      Caution
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gold">
                      {formatCurrency(cautionAmount)}
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Select
                      label="Mode de caution"
                      value={cautionType}
                      onChange={(e) =>
                        setCautionType(e.target.value as CautionType)
                      }
                    >
                      <option value="cheque">Chèque</option>
                      <option value="carte_empreinte">
                        Empreinte carte (TPE agence)
                      </option>
                      <option value="cash">Espèces</option>
                    </Select>
                    {cautionType === 'cheque' ? (
                      <Input
                        label="Référence chèque"
                        value={cautionReference}
                        onChange={(e) => setCautionReference(e.target.value)}
                        placeholder="Ex: 123456"
                      />
                    ) : (
                      <div className="rounded-2xl border border-gold/10 bg-gold/5 p-4 text-sm text-cream-muted flex items-center">
                        {cautionType === 'carte_empreinte'
                          ? "Empreinte carte : opération réalisée à l'agence via le TPE."
                          : "Espèces : aucun justificatif requis au démarrage."}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Actions list */}
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-cream-muted">
                <p>La création va :</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>créer la location active</li>
                  <li>passer le véhicule en statut loué</li>
                  <li>générer le contrat (sur la fiche location)</li>
                </ul>
              </div>

              {cautionReferenceMissing && (
                <div className="rounded-2xl border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200">
                  Merci de renseigner la référence du chèque avant de
                  démarrer la location.
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  variant="gold"
                  disabled={createDirect.isPending || cautionReferenceMissing}
                  onClick={() => createDirect.mutate()}
                >
                  {createDirect.isPending
                    ? 'Création…'
                    : isRetroactive ? 'Enregistrer la location' : 'Démarrer la location'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </section>
          )}
        </div>
      )}

      {/* ═══ RESERVATION MODE ═══ */}
      {mode === 'reservation' && (
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="lux-panel p-6 md:p-7 space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-cream">
                Réservation à démarrer
              </h2>
              <p className="mt-1 text-sm text-cream-muted">
                Seules les réservations confirmées et non encore converties sont
                proposées.
              </p>
            </div>

            {loadingReservations ? (
              <Skeleton className="h-12 w-full" />
            ) : availableReservations.length === 0 ? (
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-sm text-cream-muted">
                Aucune réservation confirmée disponible.
              </div>
            ) : (
              <Select
                label="Réservation confirmée"
                value={selectedReservationId}
                onChange={(e) => setSelectedReservationId(e.target.value)}
              >
                {availableReservations.map((item) => (
                  <option key={item._id} value={item._id}>
                    {getReservationClientName(item)} {'—'}{' '}
                    {item.vehicule?.marque} {item.vehicule?.modele}
                  </option>
                ))}
              </Select>
            )}

            {selectedReservation && (
              <div className="space-y-3">
                <div className="lux-panel-muted p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                    Client
                  </p>
                  <p className="mt-2 text-sm text-cream">
                    {getReservationClientName(selectedReservation)}
                  </p>
                  <p className="mt-1 text-xs text-cream-muted">
                    {selectedReservation.client?.telephone ??
                      selectedReservation.clientInline?.telephone ??
                      'Sans téléphone'}
                  </p>
                </div>
                <div className="lux-panel-muted p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                    Véhicule
                  </p>
                  <p className="mt-2 text-sm text-cream">
                    {selectedReservation.vehicule?.marque}{' '}
                    {selectedReservation.vehicule?.modele}
                  </p>
                  <p className="mt-1 text-xs text-cream-muted">
                    {selectedReservation.vehicule?.immatriculation}
                  </p>
                </div>
                <div className="lux-panel-muted p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                    Période
                  </p>
                  <p className="mt-2 text-sm text-cream">
                    {formatDateTime(selectedReservation.debutAt)}
                  </p>
                  <p className="mt-1 text-sm text-cream">
                    {'→'} {formatDateTime(selectedReservation.finAt)}
                  </p>
                </div>
              </div>
            )}
          </section>

          <section className="lux-panel p-6 md:p-7 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-cream">
                  Prévisualisation
                </h2>
                <p className="mt-1 text-sm text-cream-muted">
                  Le dossier location sera créé avec les montants de la
                  réservation.
                </p>
              </div>
              <CheckCircle2 className="h-5 w-5 text-gold" />
            </div>

            {!selectedReservation ? (
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5 text-sm text-cream-muted">
                Sélectionnez une réservation.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="lux-panel-muted p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                      Montant contrat
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gold">
                      {formatCurrency(
                        selectedReservation.prix?.totalEstime ??
                          selectedReservation.tarifTotal ??
                          0,
                      )}
                    </p>
                  </div>
                  <div className="lux-panel-muted p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                      Caution
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gold">
                      {formatCurrency(
                        selectedReservation.vehicule?.cautionMontant ??
                          selectedReservation.vehicule?.cautionDefaut ??
                          0,
                      )}
                    </p>
                  </div>
                  <div className="lux-panel-muted p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                      Déjà encaissé
                    </p>
                    <p className="mt-2 text-lg font-semibold text-green-300">
                      {formatCurrency(selectedReservation.montantPaye ?? 0)}
                    </p>
                  </div>
                  <div className="lux-panel-muted p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-cream-faint">
                      Reste à payer
                    </p>
                    <p className="mt-2 text-lg font-semibold text-amber-300">
                      {formatCurrency(
                        selectedReservation.montantRestant ??
                          selectedReservation.prix?.totalEstime ??
                          selectedReservation.tarifTotal ??
                          0,
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <Select
                    label="Mode de caution"
                    value={cautionType}
                    onChange={(e) =>
                      setCautionType(e.target.value as CautionType)
                    }
                  >
                    <option value="cheque">Chèque</option>
                    <option value="carte_empreinte">
                      Empreinte carte (TPE agence)
                    </option>
                    <option value="cash">Espèces</option>
                  </Select>
                  {cautionType === 'cheque' ? (
                    <Input
                      label="Référence chèque"
                      value={cautionReference}
                      onChange={(e) => setCautionReference(e.target.value)}
                      placeholder="Ex: 123456"
                    />
                  ) : (
                    <div className="rounded-2xl border border-gold/10 bg-gold/5 p-4 text-sm text-cream-muted flex items-center">
                      {cautionType === 'carte_empreinte'
                        ? "Empreinte carte : opération réalisée à l'agence via le TPE."
                        : "Espèces : aucun justificatif requis au démarrage."}
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="gold"
                    disabled={
                      createFromReservation.isPending ||
                      !selectedReservation.client?._id
                    }
                    onClick={() => createFromReservation.mutate()}
                  >
                    {createFromReservation.isPending
                      ? 'Création…'
                      : 'Démarrer la location'}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
