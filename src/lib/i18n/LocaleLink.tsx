'use client';

import type { ComponentProps } from 'react';
import NextLink from 'next/link';
import { localePath } from './routing';
import { useLocale } from './LanguageProvider';

type Props = ComponentProps<typeof NextLink>;

/**
 * Lien interne qui garde la langue courante.
 * Écrire les adresses sans langue (« /catalogue ») : le préfixe est ajouté ici.
 */
export default function LocaleLink({ href, ...props }: Props) {
  const { locale } = useLocale();
  const isInternal = typeof href === 'string' && href.startsWith('/');
  return <NextLink href={isInternal ? localePath(locale, href as string) : href} {...props} />;
}
