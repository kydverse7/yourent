'use client';

import { useState, useMemo, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { X, Copy, FileText, Mail, MessageCircle, Plus, Trash2, Download, Car, User, Calendar, Receipt } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button, Input, Select, Badge } from '@/components/ui';
import {
  buildDocumentEmailSubject,
  buildDocumentShareMessage,
  buildMailtoShareUrl,
  buildWhatsAppShareUrl,
} from '@/lib/documentShare';
import { buildPdfViewerUrl, formatCurrency } from '@/lib/utils';

type ClientOption = {
  _id: string;
  nom: string;
  prenom?: string;
  telephone?: string;
  whatsapp?: string;
  email?: string;
  type?: string;
};

type VehicleOption = {
  _id: string;
  marque: string;
  modele: string;
  immatriculation: string;
  tarifParJour?: number;
  tarifJour?: number;
  tarifParJour10Plus?: number;
  tarifJour10Plus?: number;
  carburant?: string;
  boite?: string;
  categorie?: string;
};

type OptionLine = {
  nom: string;
  prix: number;
};

type VehicleEntry = {
  vehicleId: string;
  debutAt: string;
  finAt: string;
  tarifJour: number;
};

type FormData = {
  documentType: 'facture' | 'devis';
  clientId: string;
  vehicles: VehicleEntry[];
  options: OptionLine[];
  remise: number;
  notes: string;
};

const emptyVehicleEntry: VehicleEntry = { vehicleId: '', debutAt: '', finAt: '', tarifJour: 0 };

const defaultForm: FormData = {
  documentType: 'facture',
  clientId: '',
  vehicles: [{ ...emptyVehicleEntry }],
  options: [],
  remise: 0,
  notes: '',
};

interface CreateInvoiceModalProps {
  open: boolean;
  onClose: () => void;
}

type GeneratedDocumentState = {
  url: string;
  reference: string;
  documentType: 'facture' | 'devis';
  totalMontant: number;
  clientLabel?: string;
  clientEmail?: string;
  clientPhone?: string;
};

export default function CreateInvoiceModal({ open, onClose }: CreateInvoiceModalProps) {
  const qc = useQueryClient();
  const [form, setForm] = useState<FormData>(defaultForm);
  const [generatedDocument, setGeneratedDocument] = useState<GeneratedDocumentState | null>(null);

  const { data: clientsData } = useQuery({
    queryKey: ['clients-select-all'],
    queryFn: async () => {
      const res = await fetch('/api/clients?page=1&limit=200');
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur chargement clients');
      return payload.data as ClientOption[];
    },
    enabled: open,
  });

  const { data: vehiclesData } = useQuery({
    queryKey: ['vehicles-select-all'],
    queryFn: async () => {
      const res = await fetch('/api/vehicles?page=1&limit=200');
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur chargement véhicules');
      return payload.data as VehicleOption[];
    },
    enabled: open,
  });

  const clients = clientsData ?? [];
  const vehicles = vehiclesData ?? [];

  const selectedClient = clients.find((c) => c._id === form.clientId);

  const vehicleNbJours = useMemo(() => {
    return form.vehicles.map((entry) => {
      if (!entry.debutAt || !entry.finAt) return 0;
      const d1 = new Date(entry.debutAt);
      const d2 = new Date(entry.finAt);
      return Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
    });
  }, [form.vehicles]);

  const totals = useMemo(() => {
    let locationTotal = 0;
    for (let i = 0; i < form.vehicles.length; i++) {
      locationTotal += form.vehicles[i].tarifJour * vehicleNbJours[i];
    }
    const optionsTotal = form.options.reduce((sum, o) => sum + Number(o.prix || 0), 0);
    const brut = locationTotal + optionsTotal;
    const net = Math.max(0, brut - form.remise);
    return { locationTotal, optionsTotal, brut, net };
  }, [form.vehicles, vehicleNbJours, form.options, form.remise]);

  const updateVehicleEntry = useCallback((index: number, field: keyof VehicleEntry, value: string | number) => {
    setForm((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry)),
    }));
  }, []);

  const handleVehicleSelect = useCallback((index: number, vehicleId: string) => {
    const vehicle = vehicles.find((v) => v._id === vehicleId);
    const tarif = Number(vehicle?.tarifParJour ?? vehicle?.tarifJour ?? 0);
    setForm((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((entry, i) => (i === index ? { ...entry, vehicleId, tarifJour: tarif } : entry)),
    }));
  }, [vehicles]);

  const addVehicleEntry = useCallback(() => {
    setForm((prev) => ({ ...prev, vehicles: [...prev.vehicles, { ...emptyVehicleEntry }] }));
  }, []);

  const removeVehicleEntry = useCallback((index: number) => {
    setForm((prev) => ({ ...prev, vehicles: prev.vehicles.filter((_, i) => i !== index) }));
  }, []);

  const addOption = useCallback(() => {
    setForm((prev) => ({ ...prev, options: [...prev.options, { nom: '', prix: 0 }] }));
  }, []);

  const removeOption = useCallback((index: number) => {
    setForm((prev) => ({ ...prev, options: prev.options.filter((_, i) => i !== index) }));
  }, []);

  const updateOption = useCallback((index: number, field: 'nom' | 'prix', value: string | number) => {
    setForm((prev) => ({
      ...prev,
      options: prev.options.map((opt, i) => (i === index ? { ...opt, [field]: value } : opt)),
    }));
  }, []);

  const copyDocumentLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Lien du document copié');
    } catch {
      toast.error('Copie du lien impossible');
    }
  };

  const openShareUrl = (url: string | null, errorMessage: string) => {
    if (!url) {
      toast.error(errorMessage);
      return;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const shareGeneratedByEmail = () => {
    if (!generatedDocument) return;

    const mailtoUrl = buildMailtoShareUrl(
      generatedDocument.clientEmail,
      buildDocumentEmailSubject(generatedDocument.documentType, generatedDocument.reference),
      buildDocumentShareMessage({
        documentType: generatedDocument.documentType,
        reference: generatedDocument.reference,
        url: generatedDocument.url,
        clientLabel: generatedDocument.clientLabel,
      })
    );

    openShareUrl(mailtoUrl, 'Email client manquant');
  };

  const shareGeneratedByWhatsApp = () => {
    if (!generatedDocument) return;

    const whatsappUrl = buildWhatsAppShareUrl(
      generatedDocument.clientPhone,
      buildDocumentShareMessage({
        documentType: generatedDocument.documentType,
        reference: generatedDocument.reference,
        url: generatedDocument.url,
        clientLabel: generatedDocument.clientLabel,
      })
    );

    openShareUrl(whatsappUrl, 'Numéro WhatsApp client manquant');
  };

  const generateMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/invoices/create-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: form.documentType,
          clientId: form.clientId,
          vehicles: form.vehicles.map((v) => ({
            vehicleId: v.vehicleId,
            debutAt: v.debutAt,
            finAt: v.finAt,
            tarifJour: Number(v.tarifJour),
          })),
          remise: Number(form.remise),
          options: form.options.filter((o) => o.nom.trim()).map((o) => ({ nom: o.nom, prix: Number(o.prix) })),
          notes: form.notes || undefined,
        }),
      });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.error ?? 'Erreur génération document');
      return payload.data as { url: string; reference: string; documentType: string; totalMontant: number };
    },
    onSuccess: (data) => {
      toast.success(`${data.documentType === 'devis' ? 'Devis' : 'Facture'} ${data.reference} généré(e)`);
      setGeneratedDocument({
        url: data.url,
        reference: data.reference,
        documentType: data.documentType === 'devis' ? 'devis' : 'facture',
        totalMontant: data.totalMontant,
        clientLabel: selectedClient ? (selectedClient.prenom ? `${selectedClient.prenom} ${selectedClient.nom}` : selectedClient.nom) : undefined,
        clientEmail: selectedClient?.email,
        clientPhone: selectedClient?.whatsapp ?? selectedClient?.telephone,
      });
      qc.invalidateQueries({ queryKey: ['invoices'] });
      qc.invalidateQueries({ queryKey: ['generated-documents'] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const handleClose = () => {
    setForm(defaultForm);
    setGeneratedDocument(null);
    onClose();
  };

  const canSubmit = form.clientId && form.vehicles.length > 0 && form.vehicles.every((v, i) => v.vehicleId && v.debutAt && v.finAt && v.tarifJour > 0 && vehicleNbJours[i] > 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 sm:p-6 md:items-center" onClick={handleClose}>
      <div
        className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-noir-card shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/8 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold/10">
              <Receipt className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-cream">Créer un document</h2>
              <p className="text-xs text-cream-muted">Facture ou devis libre à télécharger</p>
            </div>
          </div>
          <button onClick={handleClose} className="rounded-xl p-2 text-cream-muted hover:bg-white/5 hover:text-cream transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Type de document */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-cream-muted">Type de document</p>
            <div className="flex gap-3">
              {(['facture', 'devis'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setForm((prev) => ({ ...prev, documentType: type }))}
                  className={`flex-1 rounded-2xl border px-4 py-3.5 text-sm font-semibold transition-all ${
                    form.documentType === type
                      ? 'border border-gold/40 bg-gold-gradient text-noir-root shadow-gold hover:brightness-110'
                      : 'border-white/8 bg-white/[0.03] text-cream-muted hover:border-white/15 hover:text-cream'
                  }`}
                >
                  <FileText className="mx-auto mb-1.5 h-5 w-5" />
                  {type === 'facture' ? 'Facture' : 'Devis'}
                </button>
              ))}
            </div>
          </div>

          {/* Client */}
          <div>
            <Select
              label="Client"
              value={form.clientId}
              onChange={(e) => setForm((prev) => ({ ...prev, clientId: e.target.value }))}
            >
              <option value="">Choisir un client</option>
              {clients.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.prenom ? `${c.prenom} ${c.nom}` : c.nom} {c.telephone ? `· ${c.telephone}` : ''}
                </option>
              ))}
            </Select>
            {selectedClient && (
              <div className="mt-2 flex items-center gap-2 text-xs text-cream-muted">
                <User className="h-3.5 w-3.5 text-gold" />
                <span>{selectedClient.prenom ? `${selectedClient.prenom} ${selectedClient.nom}` : selectedClient.nom}</span>
                {selectedClient.type && <Badge variant="muted">{selectedClient.type}</Badge>}
              </div>
            )}
          </div>

          {/* Véhicules */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream-muted">
                Véhicule{form.vehicles.length > 1 ? 's' : ''}
              </p>
              <Button variant="ghost" size="sm" onClick={addVehicleEntry}>
                <Plus className="h-3.5 w-3.5" /> Ajouter un véhicule
              </Button>
            </div>
            <div className="space-y-4">
              {form.vehicles.map((entry, vi) => {
                const selectedVehicle = vehicles.find((v) => v._id === entry.vehicleId);
                const nj = vehicleNbJours[vi];
                return (
                  <div key={vi} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-cream-muted">
                        <Car className="h-3.5 w-3.5 text-gold" />
                        Véhicule {form.vehicles.length > 1 ? vi + 1 : ''}
                      </div>
                      {form.vehicles.length > 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removeVehicleEntry(vi)} className="shrink-0 text-red-400 hover:text-red-300 h-7 w-7">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                    <Select
                      value={entry.vehicleId}
                      onChange={(e) => handleVehicleSelect(vi, e.target.value)}
                    >
                      <option value="">Choisir un véhicule</option>
                      {vehicles.map((v) => (
                        <option key={v._id} value={v._id}>
                          {v.marque} {v.modele} — {v.immatriculation}
                        </option>
                      ))}
                    </Select>
                    {selectedVehicle && (
                      <div className="flex items-center gap-2 text-xs text-cream-muted">
                        <span>{selectedVehicle.marque} {selectedVehicle.modele}</span>
                        {selectedVehicle.categorie && <Badge variant="muted">{selectedVehicle.categorie}</Badge>}
                      </div>
                    )}
                    <div className="grid gap-3 sm:grid-cols-3">
                      <Input
                        type="date"
                        label="Date début"
                        value={entry.debutAt}
                        onChange={(e) => updateVehicleEntry(vi, 'debutAt', e.target.value)}
                        leftIcon={<Calendar className="h-4 w-4" />}
                      />
                      <Input
                        type="date"
                        label="Date fin"
                        value={entry.finAt}
                        min={entry.debutAt || undefined}
                        onChange={(e) => updateVehicleEntry(vi, 'finAt', e.target.value)}
                        leftIcon={<Calendar className="h-4 w-4" />}
                      />
                      <Input
                        type="number"
                        label="Tarif / jour (MAD)"
                        value={entry.tarifJour || ''}
                        min={0}
                        onChange={(e) => updateVehicleEntry(vi, 'tarifJour', Number(e.target.value))}
                      />
                    </div>
                    {nj > 0 && (
                      <div className="rounded-xl border border-gold/10 bg-gold/5 px-3 py-2 text-xs text-cream">
                        <span className="font-semibold text-gold">{nj}</span> jour{nj > 1 ? 's' : ''}
                        {entry.tarifJour > 0 && (
                          <> · <span className="font-semibold text-gold">{formatCurrency(entry.tarifJour * nj)}</span></>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Options supplémentaires */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cream-muted">Options supplémentaires</p>
              <Button variant="ghost" size="sm" onClick={addOption}>
                <Plus className="h-3.5 w-3.5" /> Ajouter
              </Button>
            </div>
            {form.options.length === 0 && (
              <p className="text-xs text-cream-faint italic">Aucune option ajoutée</p>
            )}
            <div className="space-y-2">
              {form.options.map((opt, i) => (
                <div key={i} className="flex items-end gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Nom de l'option"
                      value={opt.nom}
                      onChange={(e) => updateOption(i, 'nom', e.target.value)}
                    />
                  </div>
                  <div className="w-32">
                    <Input
                      type="number"
                      placeholder="Prix"
                      value={opt.prix || ''}
                      min={0}
                      onChange={(e) => updateOption(i, 'prix', Number(e.target.value))}
                    />
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeOption(i)} className="shrink-0 text-red-400 hover:text-red-300">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Remise & Notes */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              type="number"
              label="Remise (MAD)"
              value={form.remise || ''}
              min={0}
              onChange={(e) => setForm((prev) => ({ ...prev, remise: Number(e.target.value) }))}
            />
            <Input
              label="Notes"
              value={form.notes}
              placeholder="Notes libres (optionnel)"
              onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
            />
          </div>

          {/* Récapitulatif */}
          {canSubmit && (
            <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/5 to-transparent p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-gold">Récapitulatif</p>
              <div className="space-y-1.5 text-sm">
                {form.vehicles.map((entry, vi) => {
                  const veh = vehicles.find((v) => v._id === entry.vehicleId);
                  const nj = vehicleNbJours[vi];
                  const label = veh ? `${veh.marque} ${veh.modele}` : 'Véhicule';
                  return (
                    <div key={vi} className="flex justify-between text-cream-muted">
                      <span>Location {label} ({nj}j × {formatCurrency(entry.tarifJour)})</span>
                      <span className="text-cream">{formatCurrency(entry.tarifJour * nj)}</span>
                    </div>
                  );
                })}
                {form.options.filter((o) => o.nom.trim() && o.prix > 0).map((opt, i) => (
                  <div key={i} className="flex justify-between text-cream-muted">
                    <span>Option · {opt.nom}</span>
                    <span className="text-cream">{formatCurrency(opt.prix)}</span>
                  </div>
                ))}
                {form.remise > 0 && (
                  <div className="flex justify-between text-cream-muted">
                    <span>Remise</span>
                    <span className="text-red-300">-{formatCurrency(form.remise)}</span>
                  </div>
                )}
                <div className="mt-2 border-t border-white/8 pt-2 flex justify-between font-bold">
                  <span className="text-cream">Total {form.documentType === 'devis' ? 'devis' : 'facture'}</span>
                  <span className="text-gold text-lg">{formatCurrency(totals.net)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Lien de téléchargement */}
          {generatedDocument && (
            <div className="rounded-2xl border border-green-400/20 bg-green-400/5 p-4 text-center">
              <p className="mb-2 text-sm font-semibold text-green-400">Document généré avec succès !</p>
              <p className="mb-4 text-xs text-cream-muted">
                Vous pourrez aussi le retrouver ensuite dans la section Documents générés de la page Factures.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={buildPdfViewerUrl(generatedDocument.url, `${generatedDocument.reference}.pdf`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-black shadow-gold hover:brightness-110 transition-all"
                >
                  <Download className="h-4 w-4" />
                  Ouvrir le PDF
                </a>
                <button
                  type="button"
                  onClick={() => copyDocumentLink(generatedDocument.url)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-cream hover:bg-white/[0.08]"
                >
                  <Copy className="h-4 w-4" />
                  Copier le lien
                </button>
                <button
                  type="button"
                  onClick={shareGeneratedByEmail}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-cream hover:bg-white/[0.08]"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </button>
                <button
                  type="button"
                  onClick={shareGeneratedByWhatsApp}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-cream hover:bg-white/[0.08]"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-white/8 px-6 py-4">
          <Button variant="ghost" onClick={handleClose}>Annuler</Button>
          <Button
            variant="gold"
            disabled={!canSubmit || generateMutation.isPending}
            onClick={() => {
              setGeneratedDocument(null);
              generateMutation.mutate();
            }}
          >
            {generateMutation.isPending
              ? 'Génération en cours...'
              : `Générer ${form.documentType === 'devis' ? 'le devis' : 'la facture'}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
