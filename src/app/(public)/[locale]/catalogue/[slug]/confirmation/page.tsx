import { Metadata } from 'next';
import Link from '@/lib/i18n/LocaleLink';
import { CheckCircle, Phone, Mail, ArrowRight, MessageCircle } from 'lucide-react';
import { connectDB } from '@/lib/db';
import { Agence } from '@/models/Agence';
import { t as tr, type Locale } from '@/lib/i18n';
import { BUSINESS } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: { absolute: `${tr(locale as Locale, 'confirmation.title')} | Yourent` },
    robots: { index: false, follow: false },
  };
}

/** Si la base ne répond pas, la page reste affichée avec les coordonnées de `BUSINESS`. */
async function getAgencyContact(): Promise<{ telephone: string; email: string }> {
  try {
    await connectDB();
    const agence = (await Agence.findOne().select('telephone email').lean()) as {
      telephone?: string;
      email?: string;
    } | null;
    return {
      telephone: agence?.telephone || BUSINESS.phone,
      email: agence?.email || BUSINESS.email,
    };
  } catch (error) {
    console.error('[confirmation] lecture de l’agence impossible', error);
    return { telephone: BUSINESS.phone, email: BUSINESS.email };
  }
}

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [agence, { locale: rawLocale }] = await Promise.all([getAgencyContact(), params]);
  const locale = rawLocale as Locale;

  const waPhone = agence.telephone.replace(/[\s()\-.+]/g, '').replace(/^0/, '212');
  const waMsg = locale === 'en'
    ? 'Hello, I just submitted a reservation request on Yourent and I would like to confirm it. Could you help me?'
    : locale === 'ar'
    ? 'مرحبا، لقد أرسلت طلب حجز على Yourent وأريد تأكيده. هل يمكنكم مساعدتي؟'
    : 'Bonjour, je viens de faire une demande de réservation sur Yourent et je souhaite la confirmer. Pouvez-vous m\'aider ?';
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMsg)}`;

  return (
    <div className="lux-container flex min-h-[70vh] items-center justify-center py-12">
      <div className="lux-panel w-full max-w-2xl px-6 py-10 text-center md:px-10">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gold/20 bg-gold/10">
          <CheckCircle className="w-10 h-10 text-gold" />
        </div>

        <span className="lux-eyebrow mb-5">{tr(locale, 'confirmation.eyebrow')}</span>
        <h1 className="mb-3 text-3xl font-bold text-cream md:text-4xl">{tr(locale, 'confirmation.title')}</h1>
        <p className="mx-auto mb-8 max-w-xl text-cream-muted">
          {tr(locale, 'confirmation.desc')}
        </p>

        {/* WhatsApp CTA */}
        <div className="mb-8 rounded-[24px] border border-[#25D366]/20 bg-[#25D366]/[0.06] p-6">
          <MessageCircle className="mx-auto mb-3 h-8 w-8 text-[#25D366]" />
          <p className="text-cream text-sm font-semibold mb-2">
            {locale === 'en' ? 'Contact us on WhatsApp to confirm your reservation' : locale === 'ar' ? 'تواصلوا معنا عبر واتساب لتأكيد حجزكم' : 'Contactez-nous par WhatsApp afin de confirmer votre réservation'}
          </p>
          <p className="text-cream-muted text-xs mb-4">
            {locale === 'en' ? 'We will respond as soon as possible.' : locale === 'ar' ? 'سنرد عليكم في أقرب وقت.' : 'Nous vous répondrons dans les plus brefs délais.'}
          </p>
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 rounded-2xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:bg-[#20BD5A] hover:shadow-[#25D366]/30"
          >
            <MessageCircle className="h-5 w-5" />
            {locale === 'en' ? 'Confirm on WhatsApp' : locale === 'ar' ? 'تأكيد عبر واتساب' : 'Confirmer sur WhatsApp'}
          </a>
        </div>

        <div className="mb-8 rounded-[24px] border border-white/8 bg-white/[0.03] p-6">
          <p className="text-cream text-sm font-semibold mb-4">{tr(locale, 'confirmation.help')}</p>
          <div className="space-y-3">
            <a
              href={`tel:+${waPhone}`}
              className="flex items-center gap-3 justify-center text-cream hover:text-gold transition-colors"
            >
              <Phone className="w-4 h-4 text-gold" /> <bdi dir="ltr">+{waPhone}</bdi>
            </a>
            <a
              href={`mailto:${agence.email}`}
              className="flex items-center gap-3 justify-center text-cream hover:text-gold transition-colors"
            >
              <Mail className="w-4 h-4 text-gold" /> {agence.email}
            </a>
          </div>
        </div>

        <Link
          href="/catalogue"
          className="btn-gold"
        >
          {tr(locale, 'confirmation.backCatalogue')} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
