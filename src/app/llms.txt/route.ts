import { ARTICLES } from '@/content/blog';
import { loadPageContent, PAGE_KEYS_WITH_CONTENT } from '@/content/pages';
import { getFleetModels } from '@/lib/seo/fleet';
import { getRoutePath } from '@/lib/seo/routes';
import { absoluteUrl, BUSINESS } from '@/lib/site';

export const revalidate = 3600;

const CATEGORY_LABELS: Record<string, string> = {
  economique: 'Économiques',
  berline: 'Berlines',
  suv: 'SUV',
  premium: 'Premium',
};
const CATEGORY_ORDER = ['economique', 'berline', 'suv', 'premium'];

/** Présentation de l'agence au format llms.txt, pour les assistants IA. Faits vérifiés uniquement. */
export async function GET() {
  const models = await getFleetModels();
  const lines: string[] = [];

  lines.push(`# ${BUSINESS.name}`, '');
  lines.push(
    `> ${BUSINESS.name} est une agence de location de voitures à Casablanca (Maroc). Livraison gratuite dans tout Casablanca et à l'aéroport Mohammed V, 7j/7. Réservation en ligne par demande de disponibilité, confirmée par l'équipe sur WhatsApp ou par téléphone.`,
    '',
  );

  lines.push('## Coordonnées', '');
  lines.push(`- Adresse : ${BUSINESS.address.full}`);
  lines.push(`- Téléphone et WhatsApp : ${BUSINESS.phoneDisplay}`);
  lines.push(`- E-mail : ${BUSINESS.email}`);
  lines.push(`- Horaires : ${BUSINESS.hours.display} (de 8h à 22h)`);
  lines.push(`- Site : ${absoluteUrl('/')}`);
  lines.push(
    `- Note Google : ${String(BUSINESS.googleRating.value).replace('.', ',')}/5 sur ${BUSINESS.googleRating.count} avis (relevé du ${BUSINESS.googleRating.asOf})`,
    '',
  );

  lines.push('## Conditions', '');
  lines.push(`- Location de ${BUSINESS.minRentalDays} jours minimum. Tarif réduit automatique au-delà de 10 jours.`);
  lines.push(
    '- Livraison gratuite dans tout Casablanca et à l\'aéroport Mohammed V (livraison à l\'hôtel, à l\'aéroport ou à l\'adresse choisie). Mohammedia : possible avec un léger supplément.',
  );
  lines.push('- Documents : pièce d\'identité valide (CIN ou passeport), permis de plus de 2 ans, justificatif de domicile. Permis international accepté pour les touristes étrangers.');
  lines.push('- Caution demandée au départ (chèque, espèces ou empreinte de carte), montant selon le véhicule, restituée au retour du véhicule en bon état.');
  lines.push('- Assurance tous risques avec franchise sur tous les véhicules.');
  lines.push('- Modification ou annulation sans frais jusqu\'à 24 h avant la prise en charge ; au-delà, des frais peuvent s\'appliquer.');
  lines.push('- Pas de paiement en ligne : la réservation en ligne est une demande, le règlement se fait ensuite avec l\'équipe.', '');

  if (models.length > 0) {
    lines.push('## Gamme et tarifs', '');
    lines.push('Prix par jour en dirhams (DH) pour une location de 5 à 10 jours ; tarif par jour au-delà de 10 jours entre parenthèses. Prix susceptibles d\'évoluer : le catalogue fait foi.', '');
    const known = new Set(CATEGORY_ORDER);
    const groups = [...CATEGORY_ORDER, ...new Set(models.map((m) => m.categorie).filter((c) => !known.has(c)))];
    for (const category of groups) {
      const inGroup = models.filter((model) => model.categorie === category);
      if (inGroup.length === 0) continue;
      lines.push(`### ${CATEGORY_LABELS[category] ?? (category || 'Autres')}`, '');
      for (const model of inGroup) {
        const long = model.minTarifLong > 0 && model.minTarifLong !== model.minTarif ? ` (${model.minTarifLong} DH au-delà de 10 jours)` : '';
        lines.push(
          `- [${model.marque} ${model.modele}](${absoluteUrl(`/catalogue/${model.slug}`)}) : dès ${model.minTarif} DH par jour${long}`,
        );
      }
      lines.push('');
    }
  }

  lines.push('## Pages principales', '');
  lines.push(`- [Accueil](${absoluteUrl('/')}) : présentation de l'agence`);
  lines.push(`- [Catalogue](${absoluteUrl('/catalogue')}) : tous les véhicules, avec recherche de disponibilité par dates`);
  for (const key of PAGE_KEYS_WITH_CONTENT) {
    const content = await loadPageContent(key);
    const path = getRoutePath(key, 'fr');
    if (!content || !path) continue;
    lines.push(`- [${content.fr.breadcrumb}](${absoluteUrl(path)})`);
  }
  if (ARTICLES.length > 0) {
    lines.push('', '## Blog', '');
    for (const article of ARTICLES) {
      lines.push(`- [${article.h1}](${absoluteUrl(`/blog/${article.slug}`)})`);
    }
  }
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
