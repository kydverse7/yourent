import { cookies } from 'next/headers';
import { PublicLayoutShell } from './_components/PublicLayoutShell';
import type { Locale } from '@/lib/i18n';

const VALID_LOCALES = new Set<Locale>(['fr', 'en', 'ar']);

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const raw = cookieStore.get('locale')?.value;
  const initialLocale: Locale = raw && VALID_LOCALES.has(raw as Locale) ? (raw as Locale) : 'fr';

  return (
    <PublicLayoutShell initialLocale={initialLocale}>
      {children}
    </PublicLayoutShell>
  );
}
