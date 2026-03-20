import { differenceInDays, isBefore } from 'date-fns';
import { ALERT_URGENCE_JOURS, ALERT_WARNING_JOURS } from '@/lib/constants';
import { getAlertKmSeverity, type AlertSeverity } from '@/lib/utils';

export type VehicleAlertType = 'ct' | 'assurance' | 'vidange';

export type VehicleAlertRow = {
  id: string;
  vehicleId: string;
  type: VehicleAlertType;
  label: string;
  severity: AlertSeverity;
  vehicleLabel: string;
  immatriculation?: string;
  currentKm?: number;
  dueDate?: string;
  dueKm?: number;
  daysLeft?: number;
  kmLeft?: number;
};

function getDateSeverity(date: Date | string | null | undefined): AlertSeverity {
  if (!date) return 'ok';
  const now = new Date();
  const dueDate = new Date(date);
  if (isBefore(dueDate, now)) return 'depasse';
  const daysLeft = differenceInDays(dueDate, now);
  if (daysLeft <= ALERT_URGENCE_JOURS) return 'urgence';
  if (daysLeft <= ALERT_WARNING_JOURS) return 'warning';
  return 'ok';
}

function buildVehicleLabel(vehicle: any) {
  return `${vehicle?.marque ?? ''} ${vehicle?.modele ?? ''}`.trim() || 'Véhicule';
}

export function buildActiveVehicleAlerts(vehicles: any[]): VehicleAlertRow[] {
  return vehicles.flatMap((vehicle) => {
    const vehicleId = String(vehicle?._id ?? '');
    const vehicleLabel = buildVehicleLabel(vehicle);
    const immatriculation = vehicle?.immatriculation;
    const currentKm = Number(vehicle?.kilometrage ?? 0);
    const alerts: VehicleAlertRow[] = [];

    const ctDate = vehicle?.alerts?.controleTechniqueExpireLe;
    const ctSeverity = getDateSeverity(ctDate);
    if (ctDate && ctSeverity !== 'ok') {
      alerts.push({
        id: `${vehicleId}:ct`,
        vehicleId,
        type: 'ct',
        label: 'Contrôle technique',
        severity: ctSeverity,
        vehicleLabel,
        immatriculation,
        dueDate: new Date(ctDate).toISOString(),
        daysLeft: differenceInDays(new Date(ctDate), new Date()),
      });
    }

    const assuranceDate = vehicle?.alerts?.assuranceExpireLe;
    const assuranceSeverity = getDateSeverity(assuranceDate);
    if (assuranceDate && assuranceSeverity !== 'ok') {
      alerts.push({
        id: `${vehicleId}:assurance`,
        vehicleId,
        type: 'assurance',
        label: 'Assurance',
        severity: assuranceSeverity,
        vehicleLabel,
        immatriculation,
        dueDate: new Date(assuranceDate).toISOString(),
        daysLeft: differenceInDays(new Date(assuranceDate), new Date()),
      });
    }

    const dueKm = Number(vehicle?.alerts?.vidangeAtKm ?? 0);
    const vidangeSeverity = dueKm ? getAlertKmSeverity(currentKm, dueKm) : 'ok';
    if (dueKm && vidangeSeverity !== 'ok') {
      alerts.push({
        id: `${vehicleId}:vidange`,
        vehicleId,
        type: 'vidange',
        label: 'Vidange',
        severity: vidangeSeverity,
        vehicleLabel,
        immatriculation,
        currentKm,
        dueKm,
        kmLeft: dueKm - currentKm,
      });
    }

    return alerts;
  });
}

export function getAlertSeverityLabel(severity: AlertSeverity) {
  switch (severity) {
    case 'depasse':
      return 'Expirée';
    case 'urgence':
      return 'Urgente';
    case 'warning':
      return 'À anticiper';
    default:
      return 'OK';
  }
}
