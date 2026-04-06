import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

type AgencyData = {
  nom: string;
  logoUrl?: string;
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
    paddingTop: 14,
    paddingBottom: 16,
    paddingHorizontal: 16,
    fontSize: 8.2,
    color: '#111827',
    fontFamily: 'Helvetica',
    lineHeight: 1.18,
  },
  frame: {
    borderWidth: 1,
    borderColor: '#1f2937',
    padding: 8,
  },
  headerBand: {
    borderWidth: 1,
    borderColor: '#d4af37',
    backgroundColor: '#fbf5df',
    padding: 8,
    marginBottom: 6,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  agencyBlock: {
    flex: 1.05,
    paddingRight: 8,
  },
  titleBlock: {
    flex: 1.15,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  metaBlock: {
    width: 126,
    alignItems: 'flex-end',
  },
  agencyName: {
    fontSize: 15,
    fontWeight: 700,
    color: '#8b6a16',
    textTransform: 'uppercase',
  },
  agencyMeta: {
    fontSize: 7.2,
    color: '#4b5563',
    marginTop: 1,
  },
  titlePill: {
    backgroundColor: '#111827',
    borderRadius: 999,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  titlePillText: {
    color: '#fbf5df',
    fontSize: 7.1,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  contractTitle: {
    fontSize: 16,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#111827',
    textAlign: 'center',
  },
  contractSubtitle: {
    marginTop: 2,
    fontSize: 7.1,
    textAlign: 'center',
    color: '#6b7280',
  },
  metaText: {
    fontSize: 7.2,
    color: '#374151',
    marginTop: 2,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    marginTop: 6,
  },
  halfColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
    marginLeft: 6,
  },
  vehicleColumn: {
    flex: 1.24,
  },
  infoColumn: {
    flex: 0.86,
    marginLeft: 6,
  },
  box: {
    borderWidth: 1,
    borderColor: '#d4af37',
    backgroundColor: '#fffdf7',
    padding: 6,
  },
  compactBox: {
    borderWidth: 1,
    borderColor: '#d4af37',
    backgroundColor: '#fffdf7',
    padding: 6,
  },
  fullBox: {
    borderWidth: 1,
    borderColor: '#d4af37',
    backgroundColor: '#fffdf7',
    padding: 6,
    marginTop: 6,
  },
  boxTitle: {
    fontSize: 9.4,
    fontWeight: 700,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#8b6a16',
    marginBottom: 4,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#efe3ba',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  fieldLabel: {
    width: 86,
    fontSize: 7.1,
    color: '#4b5563',
    paddingTop: 1,
  },
  fieldValue: {
    flex: 1,
    fontSize: 7.9,
    borderBottomWidth: 0.8,
    borderBottomColor: '#cbd5e1',
    minHeight: 10,
    paddingBottom: 1,
  },
  twinFields: {
    flexDirection: 'row',
  },
  twinField: {
    flex: 1,
  },
  twinFieldSpaced: {
    flex: 1,
    marginLeft: 6,
  },
  emphasisText: {
    fontSize: 8.7,
    fontWeight: 700,
    color: '#111827',
    marginTop: 2,
    marginBottom: 4,
  },
  noteText: {
    fontSize: 7.2,
    color: '#374151',
    marginTop: 2,
  },
  splitBlock: {
    flexDirection: 'row',
    marginTop: 4,
  },
  splitCol: {
    flex: 1,
  },
  splitColSpaced: {
    flex: 1,
    marginLeft: 8,
  },
  financialLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 0.8,
    borderBottomColor: '#d1d5db',
    paddingBottom: 2,
    marginBottom: 3,
    minHeight: 12,
  },
  financialLabel: {
    flex: 1,
    fontSize: 7.3,
    color: '#374151',
    paddingRight: 6,
  },
  financialValue: {
    width: 88,
    fontSize: 7.6,
    fontWeight: 700,
    textAlign: 'right',
    color: '#111827',
  },
  totalBanner: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#111827',
    backgroundColor: '#f8f1dc',
    padding: 6,
  },
  totalBannerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  totalBannerLabel: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#111827',
  },
  totalBannerValue: {
    fontSize: 8.8,
    fontWeight: 700,
    color: '#8b6a16',
  },
  signaturesRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  signatureBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d4af37',
    backgroundColor: '#fffdf7',
    minHeight: 74,
    padding: 6,
    justifyContent: 'space-between',
  },
  signatureBoxSpaced: {
    flex: 1,
    marginLeft: 6,
    borderWidth: 1,
    borderColor: '#d4af37',
    backgroundColor: '#fffdf7',
    minHeight: 74,
    padding: 6,
    justifyContent: 'space-between',
  },
  signatureTitle: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#111827',
  },
  signatureHint: {
    fontSize: 7,
    color: '#6b7280',
    marginTop: 3,
  },
  signatureLine: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#9ca3af',
    height: 22,
  },
  legalBand: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#111827',
    backgroundColor: '#111827',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  legalText: {
    fontSize: 7.2,
    textAlign: 'center',
    fontWeight: 700,
    color: '#f9fafb',
  },
  footer: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    paddingTop: 4,
  },
  footerText: {
    fontSize: 7,
    textAlign: 'center',
    color: '#6b7280',
  },
});

const invoiceStyles = StyleSheet.create({
  page: {
    paddingTop: 16,
    paddingBottom: 18,
    paddingHorizontal: 16,
    fontSize: 8.2,
    color: '#111827',
    fontFamily: 'Helvetica',
    lineHeight: 1.18,
  },
  frame: {
    borderWidth: 1,
    borderColor: '#1f2937',
    padding: 8,
  },
  headerBand: {
    borderWidth: 1,
    borderColor: '#d4af37',
    backgroundColor: '#fbf5df',
    padding: 8,
    marginBottom: 6,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandSide: {
    flex: 1.05,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrap: {
    width: 42,
    height: 42,
    borderWidth: 1,
    borderColor: '#d4af37',
    borderRadius: 10,
    backgroundColor: '#fff8e8',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginRight: 8,
  },
  logo: {
    width: 34,
    height: 34,
    objectFit: 'contain',
  },
  brandTextWrap: {
    flex: 1,
  },
  agencyName: {
    fontSize: 15,
    fontWeight: 700,
    color: '#8b6a16',
    textTransform: 'uppercase',
  },
  agencyMeta: {
    fontSize: 7.1,
    color: '#4b5563',
    marginTop: 1,
  },
  centerHead: {
    flex: 1.1,
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  titlePill: {
    backgroundColor: '#111827',
    borderRadius: 999,
    paddingVertical: 3,
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  titlePillText: {
    color: '#fbf5df',
    fontSize: 7.1,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  docTitle: {
    fontSize: 16,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#111827',
    textAlign: 'center',
  },
  docSubtitle: {
    marginTop: 2,
    fontSize: 7.1,
    textAlign: 'center',
    color: '#6b7280',
  },
  metaSide: {
    width: 134,
    alignItems: 'flex-end',
  },
  metaText: {
    fontSize: 7.2,
    color: '#374151',
    marginTop: 2,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    marginTop: 6,
  },
  leftCol: {
    flex: 1,
  },
  rightCol: {
    flex: 1,
    marginLeft: 6,
  },
  box: {
    borderWidth: 1,
    borderColor: '#d4af37',
    backgroundColor: '#fffdf7',
    padding: 6,
  },
  boxTitle: {
    fontSize: 9.3,
    fontWeight: 700,
    color: '#8b6a16',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 4,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#efe3ba',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 3,
  },
  fieldLabel: {
    width: 82,
    fontSize: 7.1,
    color: '#4b5563',
    paddingTop: 1,
  },
  fieldValue: {
    flex: 1,
    fontSize: 7.9,
    borderBottomWidth: 0.8,
    borderBottomColor: '#cbd5e1',
    minHeight: 10,
    paddingBottom: 1,
  },
  detailBox: {
    borderWidth: 1,
    borderColor: '#d4af37',
    backgroundColor: '#fffdf7',
    padding: 6,
    marginTop: 6,
  },
  detailHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f1dc',
    borderWidth: 1,
    borderColor: '#d4af37',
    paddingVertical: 5,
    paddingHorizontal: 6,
    marginTop: 4,
  },
  detailRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.8,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  descCol: {
    flex: 1,
    fontSize: 7.5,
    color: '#111827',
    paddingRight: 8,
  },
  amountCol: {
    width: 92,
    fontSize: 7.8,
    textAlign: 'right',
    fontWeight: 700,
    color: '#111827',
  },
  totalsWrap: {
    flexDirection: 'row',
    marginTop: 6,
  },
  totalsSpacer: {
    flex: 1,
  },
  totalsBox: {
    width: 220,
    borderWidth: 1,
    borderColor: '#111827',
    backgroundColor: '#f8f1dc',
    padding: 6,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  totalLabel: {
    fontSize: 8,
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#111827',
  },
  totalValue: {
    fontSize: 8.8,
    fontWeight: 700,
    color: '#8b6a16',
    textAlign: 'right',
  },
  noteBar: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#111827',
    backgroundColor: '#111827',
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  noteText: {
    fontSize: 7.2,
    textAlign: 'center',
    fontWeight: 700,
    color: '#f9fafb',
  },
  footer: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#d1d5db',
    paddingTop: 4,
  },
  footerText: {
    fontSize: 7,
    textAlign: 'center',
    color: '#6b7280',
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
          <View style={contractStyles.headerBand}>
            <View style={contractStyles.topHeader}>
              <View style={contractStyles.agencyBlock}>
                <Text style={contractStyles.agencyName}>{data.agency.nom}</Text>
                <Text style={contractStyles.agencyMeta}>{[data.agency.adresse, data.agency.ville].filter(Boolean).join(', ') || 'Agence de location'}</Text>
                <Text style={contractStyles.agencyMeta}>{[data.agency.telephone, data.agency.email].filter(Boolean).join(' · ') || 'Coordonnées agence à compléter'}</Text>
              </View>
              <View style={contractStyles.titleBlock}>
                <View style={contractStyles.titlePill}>
                  <Text style={contractStyles.titlePillText}>Document contractuel</Text>
                </View>
                <Text style={contractStyles.contractTitle}>Contrat de location</Text>
                <Text style={contractStyles.contractSubtitle}>Mise en page compacte, claire et prête à imprimer</Text>
              </View>
              <View style={contractStyles.metaBlock}>
                <Text style={contractStyles.metaText}>Réf: {data.reference}</Text>
                <Text style={contractStyles.metaText}>Date: {formatContractDateValue(data.createdAt)}</Text>
                <Text style={contractStyles.metaText}>Client: {data.client.nomComplet}</Text>
              </View>
            </View>
          </View>

          <View style={contractStyles.row}>
            <View style={contractStyles.halfColumn}>
              <View style={contractStyles.box}>
                <Text style={contractStyles.boxTitle}>Locataire</Text>
                <ContractField label="Nom" value={data.client.nom} />
                <ContractField label="Prénom" value={data.client.prenom} />
                <ContractField label="Naissance" value={formatContractDateValue(data.client.dateNaissance)} />
                <ContractField label="Lieu" value={data.client.lieuNaissance} />
                <ContractField label="Nationalité" value={data.client.nationalite} />
                <ContractField label="Téléphone" value={data.client.telephone} />
                <ContractField label="Adresse" value={[data.client.adresse, data.client.ville].filter(Boolean).join(', ')} />
                <ContractField label="Permis" value={data.client.permisNumero} />
                <ContractField label="Document" value={clientDocument} />
              </View>
            </View>

            <View style={contractStyles.rightColumn}>
              <View style={contractStyles.box}>
                <Text style={contractStyles.boxTitle}>Autre conducteur</Text>
                <ContractField label="Nom complet" value={data.conducteurSecondaire?.nomComplet} />
                <ContractField label="Permis" value={data.conducteurSecondaire?.permisNumero} />
                <ContractField label="Délivré le" value={formatContractDateValue(data.conducteurSecondaire?.permisDelivreLe)} />
                <ContractField label="Pièce" value="—" />
                <ContractField label="Téléphone" value="—" />
                <ContractField label="Observations" value={data.notes} />
              </View>
            </View>
          </View>

          <View style={contractStyles.row}>
            <View style={contractStyles.vehicleColumn}>
              <View style={contractStyles.box}>
                <Text style={contractStyles.boxTitle}>Véhicule</Text>
                <ContractField label="Modèle" value={data.vehicle.label} />
                <ContractField label="Matricule" value={data.vehicle.immatriculation} />
                <View style={contractStyles.twinFields}>
                  <View style={contractStyles.twinField}>
                    <ContractField label="Date départ" value={formatContractDateValue(data.period.debutAt)} />
                  </View>
                  <View style={contractStyles.twinFieldSpaced}>
                    <ContractField label="Heure" value={formatTimeValue(data.period.heureDepart, data.period.debutAt)} />
                  </View>
                </View>
                <ContractField label="Lieu départ" value={data.period.lieuDepart || 'Casablanca'} />
                <ContractField label="KM départ" value={formatNumberValue(data.vehicle.kilometrage)} />
                <View style={contractStyles.twinFields}>
                  <View style={contractStyles.twinField}>
                    <ContractField label="Date retour" value={formatContractDateValue(data.period.finAt)} />
                  </View>
                  <View style={contractStyles.twinFieldSpaced}>
                    <ContractField label="Heure" value={formatTimeValue(data.period.heureRetour, data.period.finAt)} />
                  </View>
                </View>
                <ContractField label="Lieu retour" value={data.period.lieuRetour || 'Casablanca'} />
                <ContractField label="KM retour" value="—" />
              </View>
            </View>

            <View style={contractStyles.infoColumn}>
              <View style={contractStyles.compactBox}>
                <Text style={contractStyles.boxTitle}>Informations</Text>
                <Text style={contractStyles.emphasisText}>Franchise: {data.franchiseLabel || 'Selon conditions agence'}</Text>
                <Text style={contractStyles.noteText}>GSM agence: {printableValue(data.agency.telephone)}</Text>
                <Text style={contractStyles.noteText}>Tél client: {printableValue(data.client.telephone)}</Text>
                <Text style={contractStyles.noteText}>Carburant: {printableValue(data.vehicle.carburant)}</Text>
                <Text style={contractStyles.noteText}>Boîte: {printableValue(data.vehicle.boite)}</Text>
                <Text style={contractStyles.noteText}>Assurance: {printableValue(data.vehicle.assuranceNumero)}</Text>
                <Text style={contractStyles.noteText}>Expire le: {formatContractDateValue(data.vehicle.assuranceExpireLe)}</Text>
                <Text style={contractStyles.noteText}>Caution: {formatCurrencyValue(data.cautionMontant || 0, devise)}</Text>
                <Text style={contractStyles.noteText}>Paiement: {printableValue(data.modePaiementLabel)}</Text>
                {data.cautionTypeLabel ? <Text style={contractStyles.noteText}>Type caution: {data.cautionTypeLabel}</Text> : null}
                {data.cautionReference ? <Text style={contractStyles.noteText}>Référence: {data.cautionReference}</Text> : null}
              </View>
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

              <View style={contractStyles.splitColSpaced}>
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
            <View style={contractStyles.signatureBoxSpaced}>
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
  const footerText = [data.agency.adresse, data.agency.ville, data.agency.telephone, data.agency.email]
    .filter(Boolean)
    .join(' · ');

  return (
    <Document title={data.title} author={data.agency.nom}>
      <Page size="A4" style={invoiceStyles.page}>
        <View style={invoiceStyles.frame}>
          <View style={invoiceStyles.headerBand}>
            <View style={invoiceStyles.headerRow}>
              <View style={invoiceStyles.brandSide}>
                <View style={invoiceStyles.logoWrap}>
                  {data.agency.logoUrl ? <Image src={data.agency.logoUrl} style={invoiceStyles.logo} /> : null}
                </View>
                <View style={invoiceStyles.brandTextWrap}>
                  <Text style={invoiceStyles.agencyName}>{data.agency.nom}</Text>
                  <Text style={invoiceStyles.agencyMeta}>{[data.agency.adresse, data.agency.ville].filter(Boolean).join(', ') || 'Agence de location'}</Text>
                  <Text style={invoiceStyles.agencyMeta}>{[data.agency.telephone, data.agency.email].filter(Boolean).join(' · ') || 'Coordonnées agence à compléter'}</Text>
                </View>
              </View>

              <View style={invoiceStyles.centerHead}>
                <View style={invoiceStyles.titlePill}>
                  <Text style={invoiceStyles.titlePillText}>Document comptable</Text>
                </View>
                <Text style={invoiceStyles.docTitle}>Facture</Text>
                <Text style={invoiceStyles.docSubtitle}>Synthèse claire des prestations et du solde client</Text>
              </View>

              <View style={invoiceStyles.metaSide}>
                <Text style={invoiceStyles.metaText}>Réf: {data.reference}</Text>
                <Text style={invoiceStyles.metaText}>Émise le: {formatContractDateValue(data.createdAt)}</Text>
                <Text style={invoiceStyles.metaText}>Dossier: {data.dossierLabel}</Text>
                <Text style={invoiceStyles.metaText}>Statut: {data.statut || '—'}</Text>
              </View>
            </View>
          </View>

          <View style={invoiceStyles.row}>
            <View style={invoiceStyles.leftCol}>
              <View style={invoiceStyles.box}>
                <Text style={invoiceStyles.boxTitle}>Facturé à</Text>
                <View style={invoiceStyles.fieldRow}>
                  <Text style={invoiceStyles.fieldLabel}>Client</Text>
                  <Text style={invoiceStyles.fieldValue}>{printableValue(data.client.nomComplet)}</Text>
                </View>
                <View style={invoiceStyles.fieldRow}>
                  <Text style={invoiceStyles.fieldLabel}>Téléphone</Text>
                  <Text style={invoiceStyles.fieldValue}>{printableValue(data.client.telephone)}</Text>
                </View>
                <View style={invoiceStyles.fieldRow}>
                  <Text style={invoiceStyles.fieldLabel}>Email</Text>
                  <Text style={invoiceStyles.fieldValue}>{printableValue(data.client.email)}</Text>
                </View>
                <View style={invoiceStyles.fieldRow}>
                  <Text style={invoiceStyles.fieldLabel}>Adresse</Text>
                  <Text style={invoiceStyles.fieldValue}>{printableValue([data.client.adresse, data.client.ville].filter(Boolean).join(', '))}</Text>
                </View>
                <View style={invoiceStyles.fieldRow}>
                  <Text style={invoiceStyles.fieldLabel}>Document</Text>
                  <Text style={invoiceStyles.fieldValue}>{printableValue(data.client.documentLabel)}</Text>
                </View>
              </View>
            </View>

            <View style={invoiceStyles.rightCol}>
              <View style={invoiceStyles.box}>
                <Text style={invoiceStyles.boxTitle}>Dossier & véhicule</Text>
                <View style={invoiceStyles.fieldRow}>
                  <Text style={invoiceStyles.fieldLabel}>Dossier</Text>
                  <Text style={invoiceStyles.fieldValue}>{printableValue(data.dossierLabel)}</Text>
                </View>
                <View style={invoiceStyles.fieldRow}>
                  <Text style={invoiceStyles.fieldLabel}>Véhicule</Text>
                  <Text style={invoiceStyles.fieldValue}>{printableValue(data.vehicle.label)}</Text>
                </View>
                <View style={invoiceStyles.fieldRow}>
                  <Text style={invoiceStyles.fieldLabel}>Matricule</Text>
                  <Text style={invoiceStyles.fieldValue}>{printableValue(data.vehicle.immatriculation)}</Text>
                </View>
                <View style={invoiceStyles.fieldRow}>
                  <Text style={invoiceStyles.fieldLabel}>Période</Text>
                  <Text style={invoiceStyles.fieldValue}>{`${formatContractDateValue(data.period.debutAt)} → ${formatContractDateValue(data.period.finAt)}`}</Text>
                </View>
                <View style={invoiceStyles.fieldRow}>
                  <Text style={invoiceStyles.fieldLabel}>Carburant</Text>
                  <Text style={invoiceStyles.fieldValue}>{printableValue(data.vehicle.carburant)}</Text>
                </View>
                <View style={invoiceStyles.fieldRow}>
                  <Text style={invoiceStyles.fieldLabel}>Boîte</Text>
                  <Text style={invoiceStyles.fieldValue}>{printableValue(data.vehicle.boite)}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={invoiceStyles.detailBox}>
            <Text style={invoiceStyles.boxTitle}>Détail de facturation</Text>
            <View style={invoiceStyles.detailHeader}>
              <Text style={invoiceStyles.descCol}>Libellé</Text>
              <Text style={invoiceStyles.amountCol}>Montant</Text>
            </View>
            {data.lines.map((line, index) => (
              <View key={`${line.label}-${index}`} style={invoiceStyles.detailRow}>
                <Text style={invoiceStyles.descCol}>{line.label}</Text>
                <Text style={invoiceStyles.amountCol}>{formatCurrencyValue(line.montant, devise)}</Text>
              </View>
            ))}

            <View style={invoiceStyles.totalsWrap}>
              <View style={invoiceStyles.totalsSpacer} />
              <View style={invoiceStyles.totalsBox}>
                <View style={invoiceStyles.totalRow}>
                  <Text style={invoiceStyles.totalLabel}>Total facture</Text>
                  <Text style={invoiceStyles.totalValue}>{formatCurrencyValue(data.totalMontant, devise)}</Text>
                </View>
                <View style={invoiceStyles.totalRow}>
                  <Text style={invoiceStyles.totalLabel}>Montant payé</Text>
                  <Text style={invoiceStyles.totalValue}>{formatCurrencyValue(data.montantPaye, devise)}</Text>
                </View>
                <View style={invoiceStyles.totalRow}>
                  <Text style={invoiceStyles.totalLabel}>Reste à payer</Text>
                  <Text style={invoiceStyles.totalValue}>{formatCurrencyValue(data.montantRestant, devise)}</Text>
                </View>
                <View style={invoiceStyles.totalRow}>
                  <Text style={invoiceStyles.totalLabel}>Mode dominant</Text>
                  <Text style={invoiceStyles.totalValue}>{printableValue(data.paiementModeLabel)}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={invoiceStyles.noteBar}>
            <Text style={invoiceStyles.noteText}>Les cautions sont exclues des montants facturés. Merci de vérifier les prestations et règlements avant remise au client.</Text>
          </View>

          <View style={invoiceStyles.footer}>
            <Text style={invoiceStyles.footerText}>{footerText || 'Facture générée automatiquement par Yourent'}</Text>
            <Text style={invoiceStyles.footerText}>Document généré automatiquement par Yourent.</Text>
          </View>
        </View>
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
