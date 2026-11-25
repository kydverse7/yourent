'use client';

import { useCallback, type ComponentProps } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { localePath } from './routing';
import { useLocale } from './LanguageProvider';

type Props = ComponentProps<typeof NextLink>;

/**
 * Lien interne qui garde la langue courante.
 * Écrire les adresses sans langue (« /catalogue ») : le préfixe est ajouté ici.
 *
 * La page visée n'est préchargée qu'à l'intention (survol, appui) : le préchargement par défaut,
 * dès qu'un lien entre dans l'écran, ajoutait le JavaScript d'autres pages à chaque chargement mobile.
 */
export default function LocaleLink({ href, onMouseEnter, onTouchStart, ...props }: Props) {
  const { locale } = useLocale();
  const router = useRouter();
  const isInternal = typeof href === 'string' && href.startsWith('/');
  const target = isInternal ? localePath(locale, href as string) : href;

  const prefetch = useCallback(() => {
    if (typeof target === 'string' && target.startsWith('/')) router.prefetch(target);
  }, [router, target]);

  return (
    <NextLink
      href={target}
      prefetch={false}
      onMouseEnter={(event) => {
        prefetch();
        onMouseEnter?.(event);
      }}
      onTouchStart={(event) => {
        prefetch();
        onTouchStart?.(event);
      }}
      {...props}
    />
  );
}
