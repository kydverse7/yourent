import { unstable_cache } from 'next/cache';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { Location } from '@/models/Location';
import { Reservation } from '@/models/Reservation';
import { buildActiveVehicleAlerts } from '@/lib/vehicle-alerts';
import { AlertTriangle, Clock, Wrench, Shield } from 'lucide-react';
import Link from 'next/link';

const getCachedDashboardAlerts = unstable_cache(
  async () => {
    await connectDB();
    const now = new Date();

    const [locationsRetard, reservationsAttente, vehicules] = await Promise.all([
      Location.find({ statut: 'en_cours', finPrevueAt: { $lt: now } })
        .populate('vehicle', 'marque modele immatriculation')
        .populate('client', 'prenom nom telephone')
        .limit(5)
        .lean(),

      Reservation.find({ statut: 'en_attente' })
        .populate('vehicle', 'marque modele immatriculation')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),

      Vehicle.find({ actif: { $ne: false } })
        .select('marque modele immatriculation kilometrage alerts')
        .lean(),
    ]);

    const activeVehicleAlerts = buildActiveVehicleAlerts(vehicules);

    return {
      locationsRetard,
      reservationsAttente,
      ctEch: activeVehicleAlerts.filter((item) => item.type === 'ct').slice(0, 5),
      assurEch: activeVehicleAlerts.filter((item) => item.type === 'assurance').slice(0, 5),
      vidangeEch: activeVehicleAlerts.filter((item) => item.type === 'vidange').slice(0, 5),
    };
  },
  ['dashboard-alerts'],
  { revalidate: 60 },
);

export default async function DashboardAlerts() {
  const { locationsRetard, reservationsAttente, ctEch, assurEch, vidangeEch } = await getCachedDashboardAlerts();

  const hasAlerts =
    locationsRetard.length + ctEch.length + assurEch.length + vidangeEch.length > 0;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="lux-panel p-5 md:p-6">
        <h2 className="text-cream font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-gold" />
          Alertes urgentes
        </h2>

        {!hasAlerts && (
          <p className="text-cream-muted text-sm">Aucune alerte — tout est en ordre ✓</p>
        )}

        <div className="space-y-3">
          {locationsRetard.map((loc: any) => (
            <Link
              key={String(loc._id)}
              href={`/locations/${loc._id}`}
              className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 hover:bg-red-500/15 transition-colors"
            >
              <Clock className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-300">
                  Retard — {(loc.vehicle as any)?.marque} {(loc.vehicle as any)?.modele}
                </p>
                <p className="text-xs text-cream-muted">
                  {(loc.client as any)?.prenom} {(loc.client as any)?.nom} · {(loc.client as any)?.telephone}
                </p>
              </div>
            </Link>
          ))}

          {ctEch.map((alert: any) => (
            <Link
              key={alert.id}
              href={`/vehicules/${alert.vehicleId}`}
              className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3 hover:bg-amber-500/15 transition-colors"
            >
              <Shield className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-300">
                  CT à renouveler — {alert.vehicleLabel}
                </p>
                <p className="text-xs text-cream-muted">{alert.immatriculation}</p>
              </div>
            </Link>
          ))}

          {assurEch.map((alert: any) => (
            <Link
              key={alert.id}
              href={`/vehicules/${alert.vehicleId}`}
              className="flex items-start gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3 hover:bg-amber-500/15 transition-colors"
            >
              <Shield className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-300">
                  Assurance expirante — {alert.vehicleLabel}
                </p>
                <p className="text-xs text-cream-muted">{alert.immatriculation}</p>
              </div>
            </Link>
          ))}

          {vidangeEch.map((alert) => (
            <Link
              key={alert.id}
              href="/alertes"
              className="flex items-start gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-3 hover:bg-blue-500/15 transition-colors"
            >
              <Wrench className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-300">
                  Vidange à traiter — {alert.vehicleLabel}
                </p>
                <p className="text-xs text-cream-muted">{alert.immatriculation} · {typeof alert.kmLeft === 'number' ? `${alert.kmLeft.toLocaleString('fr-MA')} km restants` : 'Échéance kilométrique'}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="lux-panel p-5 md:p-6">
        <h2 className="text-cream font-semibold mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-gold" />
          Réservations en attente
          {reservationsAttente.length > 0 && (
            <span className="ml-auto text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full">
              {reservationsAttente.length}
            </span>
          )}
        </h2>

        {reservationsAttente.length === 0 && (
          <p className="text-cream-muted text-sm">Aucune réservation en attente</p>
        )}

        <div className="space-y-3">
          {reservationsAttente.map((r: any) => (
            <Link
              key={String(r._id)}
              href={`/reservations/${r._id}`}
              className="flex items-start gap-3 rounded-2xl border border-gold/15 bg-gold/5 p-3 hover:bg-gold/10 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-cream truncate">
                  {r.clientInline?.prenom ?? ''} {r.clientInline?.nom ?? r.client?.prenom ?? ''}
                </p>
                <p className="text-xs text-cream-muted">
                  {(r.vehicle as any)?.marque} {(r.vehicle as any)?.modele} · {new Date(r.debutAt).toLocaleDateString('fr-MA')}
                </p>
              </div>
              <span className="text-xs text-gold whitespace-nowrap">{(r.prix?.totalEstime ?? 0).toLocaleString('fr-MA')} MAD</span>
            </Link>
          ))}
        </div>

        {reservationsAttente.length > 0 && (
          <Link
            href="/reservations?statut=en_attente"
            className="mt-4 block text-center text-xs text-gold hover:text-gold/80 transition-colors"
          >
            Voir toutes les réservations →
          </Link>
        )}
      </div>
    </div>
  );
}
