import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type AgencyData = {
  nom: string;
  adresse?: string;
  ville?: string;
  pays?: string;
  telephone?: string;
  email?: string;
  siteWeb?: string;
  ice?: string;
  rc?: string;
  devise?: string;
  conditionsGenerales?: string;
};

type ClientData = {
  nomComplet: string;
  nom?: string;
  prenom?: string;
  telephone?: string;
  email?: string;
  adresse?: string;
  ville?: string;
  dateNaissance?: Date;
  lieuNaissance?: string;
  nationalite?: string;
  documentLabel?: string;
  documentTypeLabel?: string;
  documentNumber?: string;
  documentExpireLe?: Date;
  permisNumero?: string;
  permisDelivreLe?: Date;
};

type VehicleData = {
  label: string;
  immatriculation?: string;
  carburant?: string;
  boite?: string;
  kilometrage?: number;
  assuranceNumero?: string;
  assuranceExpireLe?: Date;
};

type FinanceLine = {
  label: string;
  montant: number;
};

export type ContractPdfData = {
  title: string;
  reference: string;
  createdAt: Date;
  agency: AgencyData;
  client: ClientData;
  vehicle: VehicleData;
  period: {
    debutAt?: Date;
    finAt?: Date;
    heureDepart?: string;
    heureRetour?: string;
    lieuDepart?: string;
    lieuRetour?: string;
  };
  cautionMontant?: number;
  cautionTypeLabel?: string;
  cautionReference?: string;
  totalMontant: number;
  tarifJour?: number;
  nbJours?: number;
  montantPaye?: number;
  montantRestant?: number;
  modePaiementLabel?: string;
  franchiseLabel?: string;
  options: FinanceLine[];
  notes?: string;
  conducteurSecondaire?: {
    nomComplet: string;
    nom?: string;
    prenom?: string;
    permisNumero?: string;
    permisDelivreLe?: Date;
  };
};

export type InvoicePdfData = {
  title: string;
  reference: string;
  createdAt: Date;
  agency: AgencyData;
  client: ClientData;
  vehicle: VehicleData;
  dossierLabel: string;
  statut?: string;
  period: {
    debutAt?: Date;
    finAt?: Date;
  };
  lines: FinanceLine[];
  totalMontant: number;
  montantPaye: number;
  montantRestant: number;
  paiementModeLabel?: string;
};

export type FreeVehicleEntry = {
  label: string;
  immatriculation?: string;
  carburant?: string;
  boite?: string;
  nbJours: number;
  tarifJour: number;
  debutAt?: Date;
  finAt?: Date;
};

export type FreeDocumentPdfData = {
  title: string;
  reference: string;
  createdAt: Date;
  agency: AgencyData;
  client: ClientData;
  vehicles: FreeVehicleEntry[];
  lines: FinanceLine[];
  totalMontant: number;
  remise?: number;
  notes?: string;
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 40,
    paddingHorizontal: 36,
    fontSize: 10,
    color: '#1f2937',
    fontFamily: 'Helvetica',
    lineHeight: 1.4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#d4af37',
    paddingBottom: 12,
    marginBottom: 18,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#111827',
    marginBottom: 4,
  },
  brandMeta: {
    color: '#6b7280',
    fontSize: 9,
  },
  docTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#111827',
    textAlign: 'right',
  },
  docRef: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'right',
  },
  section: {
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 8,
    color: '#111827',
    textTransform: 'uppercase',
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fafaf9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    gap: 8,
  },
  rowLabel: {
    color: '#6b7280',
  },
  rowValue: {
    fontWeight: 600,
    textAlign: 'right',
  },
  table: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontWeight: 700,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  colWide: {
    flex: 1,
  },
  colNarrow: {
    width: 90,
    textAlign: 'right',
  },
  totalBox: {
    marginTop: 12,
    marginLeft: 'auto',
    width: 230,
    borderWidth: 1,
    borderColor: '#d4af37',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff8e1',
  },
  bodyText: {
    color: '#374151',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 36,
    right: 36,
    fontSize: 8,
    color: '#6b7280',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 8,
    textAlign: 'center',
  },
});

const contractStyles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingBottom: 26,
    paddingHorizontal: 20,
    fontSize: 9,
    color: '#111827',
    fontFamily: 'Helvetica',
    lineHeight: 1.25,
  },
  frame: {
    borderWidth: 1,
    borderColor: '#111827',
    padding: 10,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#111827',
  },
  agencyBlock: {
    width: '34%',
  },
  titleBlock: {
    width: '36%',
    alignItems: 'center',
  },
  metaBlock: {
    width: '30%',
    alignItems: 'flex-end',
  },
  agencyName: {
    fontSize: 16,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  agencyMeta: {
    fontSize: 8,
    marginTop: 1,
  },
  contractTitle: {
    fontSize: 18,
    fontWeight: 700,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  contractSubtitle: {
    marginTop: 3,
    fontSize: 8,
    textAlign: 'center',
  },
  metaText: {
    fontSize: 8,
    marginTop: 2,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  halfBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#111827',
    padding: 7,
    minHeight: 125,
  },
  vehicleBox: {
    flex: 1.28,
    borderWidth: 1,
    borderColor: '#111827',
    padding: 7,
    minHeight: 152,
  },
  sideBox: {
    flex: 0.92,
    borderWidth: 1,
    borderColor: '#111827',
    padding: 7,
    minHeight: 152,
  },
  fullBox: {
    borderWidth: 1,
    borderColor: '#111827',
    padding: 7,
    marginTop: 8,
  },
  boxTitle: {
    fontSize: 12,
    fontWeight: 700,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  fieldLabel: {
    width: 104,
    fontSize: 8.5,
  },
  fieldValue: {
    flex: 1,
    fontSize: 8.5,
    borderBottomWidth: 0.8,
    borderBottomColor: '#9ca3af',
    minHeight: 11,
    paddingBottom: 1,
  },
  twinFields: {
    flexDirection: 'row',
    gap: 8,
  },
  twinField: {
    flex: 1,
  },
  smallLabel: {
    fontSize: 8,
    marginBottom: 2,
  },
  emphasisText: {
    fontSize: 11,
    fontWeight: 700,
    marginTop: 4,
  },
  noteText: {
    fontSize: 8,
    marginTop: 3,
  },
  splitBlock: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  splitCol: {
    flex: 1,
  },
  financialLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderBottomWidth: 0.8,
    borderBottomColor: '#d1d5db',
    paddingBottom: 2,
    marginBottom: 4,
    minHeight: 14,
  },
  financialLabel: {
    fontSize: 8.5,
    maxWidth: '65%',
  },
  financialValue: {
    fontSize: 8.5,
    fontWeight: 700,
    textAlign: 'right',
  },
  totalBanner: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#111827',
    backgroundColor: '#f3f4f6',
    padding: 6,
  },
  totalBannerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  totalBannerLabel: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  totalBannerValue: {
    fontSize: 10,
    fontWeight: 700,
  },
  signaturesRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  signatureBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#111827',
    minHeight: 102,
    padding: 7,
    justifyContent: 'space-between',
  },
  signatureTitle: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  signatureHint: {
    fontSize: 8,
  },
  signatureLine: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#9ca3af',
    height: 30,
  },
  legalBand: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#111827',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  legalText: {
    fontSize: 8.5,
    textAlign: 'center',
    fontWeight: 700,
  },
  footer: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#111827',
    paddingTop: 6,
  },
  footerText: {
    fontSize: 8,
    textAlign: 'center',
  },
});

function formatDateValue(value?: Date | string | null) {
  if (!value) return '—';
  return format(new Date(value), 'dd MMM yyyy', { locale: fr });
}

function formatContractDateValue(value?: Date | string | null) {
  if (!value) return '—';
  return format(new Date(value), 'dd/MM/yyyy', { locale: fr });
}

function formatTimeValue(value?: string | null, dateValue?: Date | string | null) {
  if (value) return value;
  if (!dateValue) return '—';
  return format(new Date(dateValue), 'HH:mm', { locale: fr });
}

function formatNumberValue(value?: number | null) {
  if (typeof value !== 'number' || Number.isNaN(value)) return '—';
  return value.toLocaleString('fr-MA');
}

function printableValue(value?: string | number | null) {
  if (typeof value === 'number') return String(value);
  if (value === null || value === undefined) return '—';
  const text = String(value).trim();
  return text.length > 0 ? text : '—';
}

function ContractField({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <View style={contractStyles.fieldRow}>
      <Text style={contractStyles.fieldLabel}>{label}</Text>
      <Text style={contractStyles.fieldValue}>{printableValue(value)}</Text>
    </View>
  );
}

function formatCurrencyValue(amount: number, devise = 'MAD') {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: devise,
    maximumFractionDigits: 2,
  }).format(amount || 0);
}

function AgencyHeader({ agency, title, reference, createdAt }: { agency: AgencyData; title: string; reference: string; createdAt: Date }) {
  return (
    <View style={styles.header}>
      <View style={{ maxWidth: '58%' }}>
        <Text style={styles.brandTitle}>{agency.nom}</Text>
        <Text style={styles.brandMeta}>
          {[agency.adresse, agency.ville, agency.pays].filter(Boolean).join(', ') || 'Agence de location'}
        </Text>
        <Text style={styles.brandMeta}>
          {[agency.telephone, agency.email, agency.siteWeb].filter(Boolean).join(' · ')}
        </Text>
        <Text style={styles.brandMeta}>
          {[agency.ice ? `ICE ${agency.ice}` : '', agency.rc ? `RC ${agency.rc}` : ''].filter(Boolean).join(' · ')}
        </Text>
      </View>
      <View>
        <Text style={styles.docTitle}>{title}</Text>
        <Text style={styles.docRef}>Réf. {reference}</Text>
        <Text style={styles.docRef}>Émis le {formatDateValue(createdAt)}</Text>
      </View>
    </View>
  );
}

export function ContractPdfDocument({ data }: { data: ContractPdfData }) {
  const devise = data.agency.devise ?? 'MAD';
  const lines = data.options.length > 0
    ? data.options
    : [{ label: 'Location', montant: data.totalMontant }];
  const paidAmount = Number(data.montantPaye ?? 0);
  const remainingAmount = Number(data.montantRestant ?? Math.max(0, data.totalMontant - paidAmount));
  const clientDocument = [data.client.documentTypeLabel, data.client.documentNumber]
    .filter(Boolean)
    .join(' · ');
  const agencyFooter = [data.agency.adresse, data.agency.ville, data.agency.telephone, data.agency.email]
    .filter(Boolean)
    .join(' · ');

  return (
    <Document title={data.title} author={data.agency.nom}>
      <Page size="A4" style={contractStyles.page}>
        <View style={contractStyles.frame}>
          <View style={contractStyles.topHeader}>
            <View style={contractStyles.agencyBlock}>
              <Text style={contractStyles.agencyName}>{data.agency.nom}</Text>
              <Text style={contractStyles.agencyMeta}>{[data.agency.adresse, data.agency.ville].filter(Boolean).join(', ') || 'Agence de location'}</Text>
              <Text style={contractStyles.agencyMeta}>{[data.agency.telephone, data.agency.email].filter(Boolean).join(' · ') || 'Coordonnées agence à compléter'}</Text>
            </View>
            <View style={contractStyles.titleBlock}>
              <Text style={contractStyles.contractTitle}>Contrat de Location</Text>
              <Text style={contractStyles.contractSubtitle}>Contrat généré automatiquement à partir du dossier client et véhicule</Text>
            </View>
            <View style={contractStyles.metaBlock}>
              <Text style={contractStyles.metaText}>Référence: {data.reference}</Text>
              <Text style={contractStyles.metaText}>Émis le: {formatContractDateValue(data.createdAt)}</Text>
              <Text style={contractStyles.metaText}>Client: {data.client.nomComplet}</Text>
            </View>
          </View>

          <View style={contractStyles.row}>
            <View style={contractStyles.halfBox}>
              <Text style={contractStyles.boxTitle}>Locataire</Text>
              <ContractField label="Nom du client" value={data.client.nom} />
              <ContractField label="Prénom" value={data.client.prenom} />
              <ContractField label="Date de naissance" value={formatContractDateValue(data.client.dateNaissance)} />
              <ContractField label="Lieu de naissance" value={data.client.lieuNaissance} />
              <ContractField label="Nationalité" value={data.client.nationalite} />
              <ContractField label="Adresse" value={[data.client.adresse, data.client.ville].filter(Boolean).join(', ')} />
              <ContractField label="Permis de conduire" value={data.client.permisNumero} />
              <ContractField label="Délivré le" value={formatContractDateValue(data.client.permisDelivreLe)} />
              <ContractField label="Document" value={clientDocument} />
            </View>

            <View style={contractStyles.halfBox}>
              <Text style={contractStyles.boxTitle}>Autre conducteur</Text>
              <ContractField label="Nom et prénom" value={data.conducteurSecondaire?.nomComplet} />
              <ContractField label="Permis de conduire" value={data.conducteurSecondaire?.permisNumero} />
              <ContractField label="Délivré le" value={formatContractDateValue(data.conducteurSecondaire?.permisDelivreLe)} />
              <ContractField label="Pièce d'identité" value="—" />
              <ContractField label="Téléphone" value="—" />
              <ContractField label="Observations" value={data.notes} />
            </View>
          </View>

          <View style={contractStyles.row}>
            <View style={contractStyles.vehicleBox}>
              <Text style={contractStyles.boxTitle}>Véhicule</Text>
              <ContractField label="Véhicule" value={data.vehicle.label} />
              <ContractField label="Matricule" value={data.vehicle.immatriculation} />
              <View style={contractStyles.twinFields}>
                <View style={contractStyles.twinField}>
                  <ContractField label="Date départ" value={formatContractDateValue(data.period.debutAt)} />
                </View>
                <View style={contractStyles.twinField}>
                  <ContractField label="Heure départ" value={formatTimeValue(data.period.heureDepart, data.period.debutAt)} />
                </View>
              </View>
              <ContractField label="Lieu départ" value={data.period.lieuDepart || 'Casablanca'} />
              <ContractField label="KM départ" value={formatNumberValue(data.vehicle.kilometrage)} />
              <View style={contractStyles.twinFields}>
                <View style={contractStyles.twinField}>
                  <ContractField label="Date retour" value={formatContractDateValue(data.period.finAt)} />
                </View>
                <View style={contractStyles.twinField}>
                  <ContractField label="Heure retour" value={formatTimeValue(data.period.heureRetour, data.period.finAt)} />
                </View>
              </View>
              <ContractField label="Lieu retour" value={data.period.lieuRetour || 'Casablanca'} />
              <ContractField label="KM retour" value="—" />
              <ContractField label="Prolongations" value="—" />
            </View>

            <View style={contractStyles.sideBox}>
              <Text style={contractStyles.boxTitle}>Informations</Text>
              <Text style={contractStyles.emphasisText}>Franchise: {data.franchiseLabel || 'Selon conditions agence'}</Text>
              <Text style={contractStyles.noteText}>GSM agence: {printableValue(data.agency.telephone)}</Text>
              <Text style={contractStyles.noteText}>Tél client: {printableValue(data.client.telephone)}</Text>
              <Text style={contractStyles.noteText}>Carburant: {printableValue(data.vehicle.carburant)}</Text>
              <Text style={contractStyles.noteText}>Boîte: {printableValue(data.vehicle.boite)}</Text>
              <Text style={contractStyles.noteText}>Assurance N°: {printableValue(data.vehicle.assuranceNumero)}</Text>
              <Text style={contractStyles.noteText}>Expire le: {formatContractDateValue(data.vehicle.assuranceExpireLe)}</Text>
              <Text style={contractStyles.noteText}>Caution: {formatCurrencyValue(data.cautionMontant || 0, devise)}</Text>
              <Text style={contractStyles.noteText}>Mode de paiement: {printableValue(data.modePaiementLabel)}</Text>
              {data.cautionTypeLabel ? <Text style={contractStyles.noteText}>Type de caution: {data.cautionTypeLabel}</Text> : null}
              {data.cautionReference ? <Text style={contractStyles.noteText}>Référence: {data.cautionReference}</Text> : null}
              <Text style={contractStyles.noteText}>Divers: {printableValue(data.notes)}</Text>
            </View>
          </View>

          <View style={contractStyles.fullBox}>
            <Text style={contractStyles.boxTitle}>Location</Text>
            <View style={contractStyles.splitBlock}>
              <View style={contractStyles.splitCol}>
                <View style={contractStyles.financialLine}>
                  <Text style={contractStyles.financialLabel}>Du</Text>
                  <Text style={contractStyles.financialValue}>{formatContractDateValue(data.period.debutAt)}</Text>
                </View>
                <View style={contractStyles.financialLine}>
                  <Text style={contractStyles.financialLabel}>Au</Text>
                  <Text style={contractStyles.financialValue}>{formatContractDateValue(data.period.finAt)}</Text>
                </View>
                <View style={contractStyles.financialLine}>
                  <Text style={contractStyles.financialLabel}>Nombre de jours</Text>
                  <Text style={contractStyles.financialValue}>{printableValue(data.nbJours)}</Text>
                </View>
                <View style={contractStyles.financialLine}>
                  <Text style={contractStyles.financialLabel}>Tarif / jour</Text>
                  <Text style={contractStyles.financialValue}>{formatCurrencyValue(data.tarifJour || 0, devise)}</Text>
                </View>
                <View style={contractStyles.financialLine}>
                  <Text style={contractStyles.financialLabel}>Mode de paiement</Text>
                  <Text style={contractStyles.financialValue}>{printableValue(data.modePaiementLabel)}</Text>
                </View>
                <View style={contractStyles.financialLine}>
                  <Text style={contractStyles.financialLabel}>Caution</Text>
                  <Text style={contractStyles.financialValue}>{formatCurrencyValue(data.cautionMontant || 0, devise)}</Text>
                </View>
              </View>

              <View style={contractStyles.splitCol}>
                {lines.map((line, index) => (
                  <View key={`${line.label}-${index}`} style={contractStyles.financialLine}>
                    <Text style={contractStyles.financialLabel}>{line.label}</Text>
                    <Text style={contractStyles.financialValue}>{formatCurrencyValue(line.montant, devise)}</Text>
                  </View>
                ))}
                <View style={contractStyles.financialLine}>
                  <Text style={contractStyles.financialLabel}>Avance</Text>
                  <Text style={contractStyles.financialValue}>{formatCurrencyValue(paidAmount, devise)}</Text>
                </View>
                <View style={contractStyles.financialLine}>
                  <Text style={contractStyles.financialLabel}>Reste à payer</Text>
                  <Text style={contractStyles.financialValue}>{formatCurrencyValue(remainingAmount, devise)}</Text>
                </View>
              </View>
            </View>

            <View style={contractStyles.totalBanner}>
              <View style={contractStyles.totalBannerRow}>
                <Text style={contractStyles.totalBannerLabel}>Net location</Text>
                <Text style={contractStyles.totalBannerValue}>{formatCurrencyValue(data.totalMontant, devise)}</Text>
              </View>
              <View style={contractStyles.totalBannerRow}>
                <Text style={contractStyles.totalBannerLabel}>Total facture</Text>
                <Text style={contractStyles.totalBannerValue}>{formatCurrencyValue(data.totalMontant, devise)}</Text>
              </View>
              <View style={contractStyles.totalBannerRow}>
                <Text style={contractStyles.totalBannerLabel}>Reste à payer</Text>
                <Text style={contractStyles.totalBannerValue}>{formatCurrencyValue(remainingAmount, devise)}</Text>
              </View>
            </View>
          </View>

          <View style={contractStyles.signaturesRow}>
            <View style={contractStyles.signatureBox}>
              <Text style={contractStyles.signatureTitle}>Cachet & signature agence</Text>
              <Text style={contractStyles.signatureHint}>Valider après vérification des pièces, dates et kilométrage.</Text>
              <View style={contractStyles.signatureLine} />
            </View>
            <View style={contractStyles.signatureBox}>
              <Text style={contractStyles.signatureTitle}>Signature du client</Text>
              <Text style={contractStyles.signatureHint}>Je reconnais avoir lu et accepté les conditions de location et l’état du véhicule.</Text>
              <View style={contractStyles.signatureLine} />
            </View>
          </View>

          <View style={contractStyles.legalBand}>
            <Text style={contractStyles.legalText}>Le client demeure responsable des infractions au code de la route et de l’usage du véhicule pendant la période de location.</Text>
          </View>

          <View style={contractStyles.footer}>
            <Text style={contractStyles.footerText}>{agencyFooter || 'Document généré automatiquement par Yourent'}</Text>
            <Text style={contractStyles.footerText}>Merci de vérifier les informations avant impression et signature.</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export function InvoicePdfDocument({ data }: { data: InvoicePdfData }) {
  const devise = data.agency.devise ?? 'MAD';

  return (
    <Document title={data.title} author={data.agency.nom}>
      <Page size="A4" style={styles.page}>
        <AgencyHeader agency={data.agency} title={data.title} reference={data.reference} createdAt={data.createdAt} />

        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Facturé à</Text>
            <Text style={styles.bodyText}>{data.client.nomComplet}</Text>
            <Text style={styles.bodyText}>{data.client.telephone || '—'}</Text>
            <Text style={styles.bodyText}>{data.client.email || '—'}</Text>
            <Text style={styles.bodyText}>{[data.client.adresse, data.client.ville].filter(Boolean).join(', ') || '—'}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Dossier</Text>
            <Text style={styles.bodyText}>{data.dossierLabel}</Text>
            <Text style={styles.bodyText}>Statut: {data.statut || '—'}</Text>
            <Text style={styles.bodyText}>Période: {formatDateValue(data.period.debutAt)} → {formatDateValue(data.period.finAt)}</Text>
            <Text style={styles.bodyText}>{data.vehicle.label}</Text>
            <Text style={styles.bodyText}>Immatriculation: {data.vehicle.immatriculation || '—'}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détail de facturation</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.colWide}>Libellé</Text>
              <Text style={styles.colNarrow}>Montant</Text>
            </View>
            {data.lines.map((line, index) => (
              <View key={`${line.label}-${index}`} style={styles.tableRow}>
                <Text style={styles.colWide}>{line.label}</Text>
                <Text style={styles.colNarrow}>{formatCurrencyValue(line.montant, devise)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.totalBox}>
            <View style={styles.row}><Text style={styles.rowLabel}>Total dossier</Text><Text style={styles.rowValue}>{formatCurrencyValue(data.totalMontant, devise)}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Montant payé</Text><Text style={styles.rowValue}>{formatCurrencyValue(data.montantPaye, devise)}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Reste à payer</Text><Text style={styles.rowValue}>{formatCurrencyValue(data.montantRestant, devise)}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Mode dominant</Text><Text style={styles.rowValue}>{data.paiementModeLabel || '—'}</Text></View>
          </View>
        </View>

        <Text style={styles.footer}>
          Facture générée automatiquement par Yourent · Les cautions sont exclues des montants facturés.
        </Text>
      </Page>
    </Document>
  );
}

export function FreeDocumentPdfDocument({ data }: { data: FreeDocumentPdfData }) {
  const devise = data.agency.devise ?? 'MAD';

  return (
    <Document title={data.title} author={data.agency.nom}>
      <Page size="A4" style={styles.page}>
        <AgencyHeader agency={data.agency} title={data.title} reference={data.reference} createdAt={data.createdAt} />

        <View style={styles.grid}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Client</Text>
            <Text style={styles.bodyText}>{data.client.nomComplet}</Text>
            <Text style={styles.bodyText}>{data.client.telephone || '—'}</Text>
            <Text style={styles.bodyText}>{data.client.email || '—'}</Text>
            <Text style={styles.bodyText}>{[data.client.adresse, data.client.ville].filter(Boolean).join(', ') || '—'}</Text>
            {data.client.documentLabel && <Text style={styles.bodyText}>{data.client.documentLabel}</Text>}
          </View>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>{data.vehicles.length > 1 ? 'Véhicules' : 'Véhicule'}</Text>
            {data.vehicles.map((v, i) => (
              <View key={String(i)}>
                <Text style={styles.bodyText}>{v.label}{v.immatriculation ? ` — ${v.immatriculation}` : ''}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.vehicles.length > 1 ? 'Véhicules & Périodes' : 'Période de location'}</Text>
          {data.vehicles.map((v, i) => (
            <View key={String(i)} style={{ ...styles.card, marginBottom: data.vehicles.length > 1 ? 6 : 0 }}>
              {data.vehicles.length > 1 && <Text style={{ ...styles.bodyText, fontFamily: 'Helvetica-Bold', marginBottom: 4 }}>{v.label}</Text>}
              <View style={styles.row}><Text style={styles.rowLabel}>Début</Text><Text style={styles.rowValue}>{formatDateValue(v.debutAt)}</Text></View>
              <View style={styles.row}><Text style={styles.rowLabel}>Fin</Text><Text style={styles.rowValue}>{formatDateValue(v.finAt)}</Text></View>
              <View style={styles.row}><Text style={styles.rowLabel}>Durée</Text><Text style={styles.rowValue}>{v.nbJours} jour{v.nbJours > 1 ? 's' : ''}</Text></View>
              <View style={styles.row}><Text style={styles.rowLabel}>Tarif journalier</Text><Text style={styles.rowValue}>{formatCurrencyValue(v.tarifJour, devise)}</Text></View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détail</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.colWide}>Libellé</Text>
              <Text style={styles.colNarrow}>Montant</Text>
            </View>
            {data.lines.map((line, index) => (
              <View key={`${line.label}-${index}`} style={styles.tableRow}>
                <Text style={styles.colWide}>{line.label}</Text>
                <Text style={styles.colNarrow}>{formatCurrencyValue(line.montant, devise)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.totalBox}>
            {data.remise ? (
              <View style={styles.row}><Text style={styles.rowLabel}>Remise</Text><Text style={styles.rowValue}>-{formatCurrencyValue(data.remise, devise)}</Text></View>
            ) : null}
            <View style={styles.row}><Text style={styles.rowLabel}>Total</Text><Text style={{ ...styles.rowValue, fontSize: 13 }}>{formatCurrencyValue(data.totalMontant, devise)}</Text></View>
          </View>
        </View>

        {data.notes ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <View style={styles.card}>
              <Text style={styles.bodyText}>{data.notes}</Text>
            </View>
          </View>
        ) : null}

        <Text style={styles.footer}>
          Document généré par Yourent · {data.title === 'Devis' ? 'Ce devis est valable 30 jours à compter de sa date d\'émission.' : 'Les cautions sont exclues des montants facturés.'}
        </Text>
      </Page>
    </Document>
  );
}
