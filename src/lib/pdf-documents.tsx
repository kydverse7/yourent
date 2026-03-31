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
  telephone?: string;
  email?: string;
  adresse?: string;
  ville?: string;
  documentLabel?: string;
  permisNumero?: string;
};

type VehicleData = {
  label: string;
  immatriculation?: string;
  carburant?: string;
  boite?: string;
  kilometrage?: number;
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
  totalMontant: number;
  tarifJour?: number;
  options: FinanceLine[];
  notes?: string;
  conducteurSecondaire?: { nomComplet: string; permisNumero?: string };
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

function formatDateValue(value?: Date | string | null) {
  if (!value) return '—';
  return format(new Date(value), 'dd MMM yyyy', { locale: fr });
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
            <Text style={styles.bodyText}>{data.client.documentLabel || 'Document non renseigné'}</Text>
            <Text style={styles.bodyText}>Permis: {data.client.permisNumero || '—'}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Véhicule</Text>
            <Text style={styles.bodyText}>{data.vehicle.label}</Text>
            <Text style={styles.bodyText}>Immatriculation: {data.vehicle.immatriculation || '—'}</Text>
            <Text style={styles.bodyText}>Carburant: {data.vehicle.carburant || '—'}</Text>
            <Text style={styles.bodyText}>Boîte: {data.vehicle.boite || '—'}</Text>
            <Text style={styles.bodyText}>
              Kilométrage départ indicatif: {typeof data.vehicle.kilometrage === 'number' ? data.vehicle.kilometrage.toLocaleString('fr-MA') : '—'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conditions de location</Text>
          <View style={styles.card}>
            <View style={styles.row}><Text style={styles.rowLabel}>Début</Text><Text style={styles.rowValue}>{formatDateValue(data.period.debutAt)}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Fin</Text><Text style={styles.rowValue}>{formatDateValue(data.period.finAt)}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Heure départ</Text><Text style={styles.rowValue}>{data.period.heureDepart || '—'}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Heure retour</Text><Text style={styles.rowValue}>{data.period.heureRetour || '—'}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Lieu départ</Text><Text style={styles.rowValue}>{data.period.lieuDepart || '—'}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Lieu retour</Text><Text style={styles.rowValue}>{data.period.lieuRetour || '—'}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Tarif jour</Text><Text style={styles.rowValue}>{formatCurrencyValue(data.tarifJour || 0, devise)}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Caution</Text><Text style={styles.rowValue}>{formatCurrencyValue(data.cautionMontant || 0, devise)}</Text></View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Éléments financiers</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.colWide}>Libellé</Text>
              <Text style={styles.colNarrow}>Montant</Text>
            </View>
            {data.options.length > 0 ? data.options.map((line, index) => (
              <View key={`${line.label}-${index}`} style={styles.tableRow}>
                <Text style={styles.colWide}>{line.label}</Text>
                <Text style={styles.colNarrow}>{formatCurrencyValue(line.montant, devise)}</Text>
              </View>
            )) : (
              <View style={styles.tableRow}>
                <Text style={styles.colWide}>Location</Text>
                <Text style={styles.colNarrow}>{formatCurrencyValue(data.totalMontant, devise)}</Text>
              </View>
            )}
          </View>

          <View style={styles.totalBox}>
            <View style={styles.row}><Text style={styles.rowLabel}>Total contrat</Text><Text style={styles.rowValue}>{formatCurrencyValue(data.totalMontant, devise)}</Text></View>
            <View style={styles.row}><Text style={styles.rowLabel}>Caution prévue</Text><Text style={styles.rowValue}>{formatCurrencyValue(data.cautionMontant || 0, devise)}</Text></View>
          </View>
        </View>

        {(data.conducteurSecondaire || data.notes || data.agency.conditionsGenerales) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Clauses et observations</Text>
            <View style={styles.card}>
              {data.conducteurSecondaire && (
                <Text style={styles.bodyText}>
                  Conducteur secondaire: {data.conducteurSecondaire.nomComplet}
                  {data.conducteurSecondaire.permisNumero ? ` · Permis ${data.conducteurSecondaire.permisNumero}` : ''}
                </Text>
              )}
              {data.notes ? <Text style={[styles.bodyText, { marginTop: 6 }]}>Notes dossier: {data.notes}</Text> : null}
              {data.agency.conditionsGenerales ? (
                <Text style={[styles.bodyText, { marginTop: 6 }]}>
                  Conditions générales: {data.agency.conditionsGenerales}
                </Text>
              ) : null}
            </View>
          </View>
        )}

        <Text style={styles.footer}>
          Document généré automatiquement par Yourent · Merci de vérifier les informations avant signature.
        </Text>
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
