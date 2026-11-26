import { t, translations, type Locale } from './translations';

/**
 * Libellés envoyés aux composants client (LanguageProvider) : la langue de la page seulement,
 * limitée aux familles de clés utilisées côté client. Une clé d'une autre famille lue par un
 * composant client s'afficherait telle quelle : ajouter alors son préfixe ici.
 * Module serveur : le dictionnaire complet ne part jamais dans le JavaScript du navigateur.
 */
const CLIENT_PREFIXES = ['nav.', 'ui.', 'aria.', 'hero.search', 'home.search', 'cat.', 'model.', 'form.'];

export function clientMessages(locale: Locale): Record<string, string> {
  const keys = Object.keys(translations.fr).filter((key) => CLIENT_PREFIXES.some((prefix) => key.startsWith(prefix)));
  return Object.fromEntries(keys.map((key) => [key, t(locale, key)]));
}
