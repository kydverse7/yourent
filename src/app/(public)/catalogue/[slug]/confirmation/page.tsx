import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Phone, Mail, ArrowRight } from 'lucide-react';
import { connectDB } from '@/lib/db';
import { Agence } from '@/models/Agence';

export const metadata: Metadata = { title: 'Demande reçue — Yourent' };

export default async function ConfirmationPage() {
  await connectDB();
  const agence = await Agence.findOne().select('telephone email').lean() as any;

  return (
    <div className="lux-container flex min-h-[70vh] items-center justify-center py-12">
      <div className="lux-panel w-full max-w-2xl px-6 py-10 text-center md:px-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
          <CheckCircle className="w-10 h-10 text-gold" />
        </div>

        <span className="lux-eyebrow mb-5">Confirmation envoyée</span>
        <h1 className="mb-3 text-3xl font-bold text-cream md:text-4xl">Demande reçue avec succès</h1>
        <p className="mx-auto mb-8 max-w-xl text-cream-muted">
          Votre demande de réservation a bien été enregistrée. Notre équipe va l'examiner et vous
          contactera dans les plus brefs délais pour confirmer votre location.
        </p>

        <div className="mb-8 rounded-[24px] border border-white/8 bg-white/[0.03] p-6">
          <p className="text-cream text-sm font-semibold mb-4">Besoin d'aide ?</p>
          <div className="space-y-3">
            {agence?.telephone && (
              <a
                href={`tel:${agence.telephone}`}
                className="flex items-center gap-3 justify-center text-cream hover:text-gold transition-colors"
              >
                <Phone className="w-4 h-4 text-gold" /> {agence.telephone}
              </a>
            )}
            {agence?.email && (
              <a
                href={`mailto:${agence.email}`}
                className="flex items-center gap-3 justify-center text-cream hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-gold" /> {agence.email}
              </a>
            )}
          </div>
        </div>

        <Link
          href="/catalogue"
          className="btn-gold"
        >
          Retour au catalogue <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
