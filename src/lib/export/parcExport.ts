import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// ===== TYPES =====
export type ParcStatut = 'disponible' | 'loue' | 'reserve' | 'maintenance';

export interface ParcRow {
  _id: string;
  immatriculation: string;
  marque: string;
  modele: string;
  statut: ParcStatut;
  clientNom: string | null;
  debutAt: string | null;
  finPrevueAt: string | null;
  nbJours: number | null;
  enRetard: boolean;
}

export interface ParcMeta {
  total: number;
  loues: number;
  retard: number;
  reserve: number;
  maintenance: number;
  disponibles: number;
  date: string;
}

export interface ParcSnapshot {
  rows: ParcRow[];
  meta: ParcMeta;
}

interface ParcVehicleInput {
  _id: unknown;
  marque?: string | null;
  modele?: string | null;
  immatriculation?: string | null;
  statut?: string | null;
}

interface ParcClientInput {
  prenom?: string | null;
  nom?: string | null;
}

interface ParcLocationInput {
  vehicle?: unknown;
  client?: ParcClientInput | null;
  debutAt?: Date | string | null;
  finPrevueAt?: Date | string | null;
  nbJours?: number | null;
}

// ===== COULEURS (Excel) =====
export type ParcRowState = 'retard' | 'loue' | 'reserve' | 'maintenance' | 'disponible';

export const HEADER_COLORS = { fill: '#1A1A1A', font: '#E8C97A' } as const;

export const ROW_COLORS: Record<ParcRowState, { fill: string | null; font: string | null }> = {
  retard: { fill: '#FFC7CE', font: '#9C0006' },
  loue: { fill: '#F5E1A4', font: '#7A5C10' },
  reserve: { fill: '#DDEBF7', font: '#1F4E78' },
  maintenance: { fill: '#E7E6E6', font: '#3F3F3F' },
  disponible: { fill: null, font: null },
};

export const STATUT_LABELS: Record<ParcStatut, string> = {
  disponible: 'Disponible',
  loue: 'Louée',
  reserve: 'Réservée',
  maintenance: 'Maintenance',
};

export function getRowState(row: Pick<ParcRow, 'statut' | 'enRetard'>): ParcRowState {
  if (row.enRetard) return 'retard';
  return row.statut;
}

// ===== CONSTRUCTION DES LIGNÉES (pur, testable) =====
function toTime(value: Date | string | null | undefined): number {
  if (value === null || value === undefined) return Number.POSITIVE_INFINITY;
  const t = new Date(value).getTime();
  return Number.isNaN(t) ? Number.POSITIVE_INFINITY : t;
}

function toIsoOrNull(value: Date | string | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function locationVehicleKey(vehicle: unknown): string {
  if (!vehicle) return '';
  if (typeof vehicle === 'object' && '_id' in (vehicle as Record<string, unknown>)) {
    return String((vehicle as { _id: unknown })._id);
  }
  return String(vehicle);
}

const STATE_RANK: Record<ParcRowState, number> = {
  retard: 0,
  loue: 1,
  reserve: 2,
  maintenance: 3,
  disponible: 4,
};

export function buildParcRows(
  vehicles: ParcVehicleInput[],
  locations: ParcLocationInput[],
  now: Date = new Date(),
): ParcSnapshot {
  const activeByVehicle = new Map<string, ParcLocationInput>();
  for (const loc of locations) {
    const key = locationVehicleKey(loc.vehicle);
    if (!key) continue;
    const existing = activeByVehicle.get(key);
    if (!existing || toTime(loc.finPrevueAt) < toTime(existing.finPrevueAt)) {
      activeByVehicle.set(key, loc);
    }
  }

  const rows: ParcRow[] = vehicles.map((v) => {
    const loc = activeByVehicle.get(String(v._id));
    const clientNom = loc?.client
      ? [loc.client.prenom, loc.client.nom].filter(Boolean).join(' ').trim() || null
      : null;
    return {
      _id: String(v._id),
      immatriculation: v.immatriculation ?? '',
      marque: v.marque ?? '',
      modele: v.modele ?? '',
      statut: (v.statut ?? 'disponible') as ParcStatut,
      clientNom,
      debutAt: toIsoOrNull(loc?.debutAt),
      finPrevueAt: toIsoOrNull(loc?.finPrevueAt),
      nbJours: loc?.nbJours ?? null,
      enRetard: !!loc && toTime(loc.finPrevueAt) < now.getTime(),
    };
  });

  rows.sort((a, b) => {
    const rankDiff = STATE_RANK[getRowState(a)] - STATE_RANK[getRowState(b)];
    if (rankDiff !== 0) return rankDiff;
    const da = a.finPrevueAt ? new Date(a.finPrevueAt).getTime() : Number.POSITIVE_INFINITY;
    const db = b.finPrevueAt ? new Date(b.finPrevueAt).getTime() : Number.POSITIVE_INFINITY;
    if (da !== db) return da - db;
    return a.immatriculation.localeCompare(b.immatriculation);
  });

  const meta: ParcMeta = {
    total: rows.length,
    loues: rows.filter((r) => r.statut === 'loue').length,
    retard: rows.filter((r) => r.enRetard).length,
    reserve: rows.filter((r) => r.statut === 'reserve').length,
    maintenance: rows.filter((r) => r.statut === 'maintenance').length,
    disponibles: rows.filter((r) => r.statut === 'disponible').length,
    date: now.toISOString(),
  };

  return { rows, meta };
}

// ===== FORMATAGE =====
function formatDateFr(value: Date | string): string {
  return format(new Date(value), 'dd/MM/yyyy', { locale: fr });
}

function dateStamp(value: string): string {
  return format(new Date(value), 'yyyy-MM-dd');
}

// ===== EXPORT EXCEL =====
interface ExcelCellStyle {
  fill?: { fgColor: { rgb: string } };
  font?: { color?: { rgb: string }; bold?: boolean; sz?: number };
  border?: {
    top?: { style: string; color: { rgb: string } };
    bottom?: { style: string; color: { rgb: string } };
    left?: { style: string; color: { rgb: string } };
    right?: { style: string; color: { rgb: string } };
  };
}

const EXCEL_HEADERS = ['Immatriculation', 'Marque', 'Modèle', 'Statut', 'Client', 'Début', 'Durée (j)', 'Retour prévu'];
const COLUMN_COUNT = EXCEL_HEADERS.length;

const EXCEL_CELL_BORDER = {
  top: { style: 'thin', color: { rgb: 'BFBFBF' } },
  bottom: { style: 'thin', color: { rgb: 'BFBFBF' } },
  left: { style: 'thin', color: { rgb: 'BFBFBF' } },
  right: { style: 'thin', color: { rgb: 'BFBFBF' } },
};

function cellAddr(r: number, c: number): string {
  return `${String.fromCharCode(65 + c)}${r + 1}`;
}

function rgb(hex: string): string {
  return hex.replace('#', '').toUpperCase();
}

function excelStyleFor(state: ParcRowState): ExcelCellStyle {
  const colors = ROW_COLORS[state];
  const style: ExcelCellStyle = { border: EXCEL_CELL_BORDER };
  if (colors.fill) style.fill = { fgColor: { rgb: rgb(colors.fill) } };
  if (colors.font) style.font = { color: { rgb: rgb(colors.font) } };
  return style;
}

export async function exportParcExcel(snapshot: ParcSnapshot): Promise<void> {
  const XLSX = await import('xlsx-js-style');
  const now = new Date(snapshot.meta.date);
  const title = `YOURENT — État du parc au ${formatDateFr(now)}`;
  const summary = `${snapshot.meta.loues} louées · ${snapshot.meta.disponibles} disponibles · ${snapshot.meta.retard} en retard`;

  const dataRows = snapshot.rows.map((row) => [
    row.immatriculation,
    row.marque,
    row.modele,
    STATUT_LABELS[row.statut],
    row.clientNom ?? '',
    row.debutAt ? formatDateFr(row.debutAt) : '',
    row.nbJours !== null && row.nbJours !== undefined ? `${row.nbJours} j` : '',
    row.finPrevueAt ? formatDateFr(row.finPrevueAt) : '',
  ]);

  const ws = XLSX.utils.aoa_to_sheet([[title], [summary], EXCEL_HEADERS, ...dataRows]);
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: COLUMN_COUNT - 1 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: COLUMN_COUNT - 1 } },
  ];
  ws['!cols'] = [
    { wch: 16 }, { wch: 15 }, { wch: 18 }, { wch: 13 },
    { wch: 26 }, { wch: 13 }, { wch: 11 }, { wch: 15 },
  ];

  const applyRowStyle = (r: number, style: ExcelCellStyle | null) => {
    for (let c = 0; c < COLUMN_COUNT; c++) {
      const addr = cellAddr(r, c);
      if (!ws[addr]) ws[addr] = { t: 's', v: '' };
      if (style) (ws[addr] as { s?: ExcelCellStyle }).s = style;
    }
  };

  applyRowStyle(0, {
    fill: { fgColor: { rgb: rgb(HEADER_COLORS.fill) } },
    font: { color: { rgb: rgb(HEADER_COLORS.font) }, bold: true, sz: 14 },
    border: EXCEL_CELL_BORDER,
  });
  applyRowStyle(1, {
    fill: { fgColor: { rgb: rgb(HEADER_COLORS.fill) } },
    font: { color: { rgb: rgb(HEADER_COLORS.font) }, sz: 11 },
    border: EXCEL_CELL_BORDER,
  });
  applyRowStyle(2, {
    fill: { fgColor: { rgb: rgb(HEADER_COLORS.fill) } },
    font: { color: { rgb: rgb(HEADER_COLORS.font) }, bold: true },
    border: EXCEL_CELL_BORDER,
  });
  snapshot.rows.forEach((row, i) => {
    applyRowStyle(3 + i, excelStyleFor(getRowState(row)));
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'État du parc');
  XLSX.writeFile(wb, `etat-parc-${dateStamp(snapshot.meta.date)}.xlsx`);
}

// ===== EXPORT IMAGE (PNG — page A4) =====
// A4 portrait à 96 dpi : 210mm ≈ 794px, 297mm ≈ 1123px
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;
const A4_PADDING = 28;

const PNG_ROW_BACKGROUNDS: Record<ParcRowState, string> = {
  retard: '#FBE4E6',
  loue: '#FBF3DA',
  reserve: '#EAF2FB',
  maintenance: '#F4F4F4',
  disponible: '#FFFFFF',
};

const PNG_STATUT_COLORS: Record<ParcRowState, string> = {
  retard: '#C00000',
  loue: '#8A6A10',
  reserve: '#1F4E78',
  maintenance: '#5A5A5A',
  disponible: '#1E7B45',
};

const PNG_TH_WIDTHS = ['13%', '11%', '13%', '14%', '20%', '10%', '7%', '12%'];

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function buildParcImageTable(snapshot: ParcSnapshot): string {
  const thCells = PNG_TH_WIDTHS.map(
    (width, i) =>
      `<th style="box-sizing:border-box;border:1px solid #B8942F;background:#C9A84C;color:#FFFFFF;text-align:left;padding:7px 8px;font-size:9.5px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;width:${width};">${escapeHtml(EXCEL_HEADERS[i])}</th>`,
  ).join('');

  const bodyRows = snapshot.rows
    .map((row) => {
      const state = getRowState(row);
      const tdStyle = `box-sizing:border-box;border:1px solid #DDDDDD;background:${PNG_ROW_BACKGROUNDS[state]};padding:4px 8px;font-size:10.5px;color:#1A1A1A;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;`;
      const retardBadge =
        state === 'retard'
          ? '<span style="display:inline-block;margin-left:6px;padding:1px 5px;border-radius:999px;border:1px solid #C00000;background:#FBE4E6;color:#C00000;font-size:7.5px;font-weight:700;letter-spacing:0.06em;">EN RETARD</span>'
          : '';
      const cells = [
        `<td style="${tdStyle}font-weight:700;">${escapeHtml(row.immatriculation)}</td>`,
        `<td style="${tdStyle}color:#5A5A5A;">${escapeHtml(row.marque)}</td>`,
        `<td style="${tdStyle}color:#5A5A5A;">${escapeHtml(row.modele)}</td>`,
        `<td style="${tdStyle}color:${PNG_STATUT_COLORS[state]};font-weight:700;">${escapeHtml(STATUT_LABELS[row.statut])}${retardBadge}</td>`,
        `<td style="${tdStyle}">${escapeHtml(row.clientNom ?? '')}</td>`,
        `<td style="${tdStyle}color:#5A5A5A;">${row.debutAt ? formatDateFr(row.debutAt) : '—'}</td>`,
        `<td style="${tdStyle}color:#5A5A5A;text-align:center;">${row.nbJours !== null && row.nbJours !== undefined ? `${row.nbJours} j` : '—'}</td>`,
        `<td style="${tdStyle}${state === 'retard' ? 'color:#C00000;font-weight:700;' : 'color:#5A5A5A;'}">${row.finPrevueAt ? formatDateFr(row.finPrevueAt) : '—'}</td>`,
      ].join('');
      return `<tr style="background:${PNG_ROW_BACKGROUNDS[state]};">${cells}</tr>`;
    })
    .join('');

  const { total, loues, disponibles, retard } = snapshot.meta;

  const content = `<div style="display:flex;justify-content:space-between;align-items:flex-end;">
    <div>
      <div style="font-size:20px;font-weight:800;letter-spacing:0.04em;color:#C9A84C;">YOURENT</div>
      <div style="font-size:13px;font-weight:600;color:#1A1A1A;margin-top:2px;">État du parc au ${formatDateFr(snapshot.meta.date)}</div>
    </div>
    <div style="font-size:10.5px;color:#5A5A5A;font-weight:600;">${total} véhicules · ${loues} louées · ${disponibles} disponibles · ${retard} en retard</div>
  </div>
  <div style="height:2px;background:linear-gradient(90deg, #C9A84C, #E8C97A);margin:10px 0 12px;"></div>
  <table style="width:100%;border-collapse:collapse;table-layout:fixed;">
    <thead><tr>${thCells}</tr></thead>
    <tbody>${bodyRows}</tbody>
  </table>
  <div style="display:flex;justify-content:space-between;margin-top:10px;font-size:8.5px;color:#9A9A9A;">
    <span>Généré par Yourent</span>
    <span>Format A4 · ${total} véhicules</span>
  </div>`;

  return `<div style="width:${A4_WIDTH}px;height:${A4_HEIGHT}px;box-sizing:border-box;background:#FFFFFF;color:#1A1A1A;padding:${A4_PADDING}px 32px;font-family:Inter,'system-ui',sans-serif;overflow:hidden;display:block;">
    <div data-parc-content style="width:100%;transform-origin:top left;">${content}</div>
  </div>`;
}

export async function exportParcImage(snapshot: ParcSnapshot): Promise<void> {
  const { toBlob } = await import('html-to-image');

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.innerHTML = buildParcImageTable(snapshot);
  document.body.appendChild(container);
  const page = container.firstElementChild as HTMLElement;
  const content = container.querySelector('[data-parc-content]') as HTMLElement;

  try {
    // Réduction automatique pour tenir sur une seule page A4
    const available = A4_HEIGHT - A4_PADDING * 2;
    const natural = content.getBoundingClientRect().height;
    if (natural > available) {
      const scale = available / natural;
      content.style.transform = `scale(${scale})`;
      content.style.width = `${100 / scale}%`;
    }

    // toBlob évite les data: URLs, bloquées par la CSP (connect-src)
    const blob = await toBlob(page, {
      width: A4_WIDTH,
      height: A4_HEIGHT,
      pixelRatio: 2,
      backgroundColor: '#FFFFFF',
    });
    if (!blob) throw new Error("Génération de l'image impossible");

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `etat-parc-${dateStamp(snapshot.meta.date)}.png`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  } finally {
    container.remove();
  }
}
