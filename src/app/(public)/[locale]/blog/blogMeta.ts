import type { Article } from '@/content/types';

/** Mots du texte de l'article (intro, sections, FAQ), pour le temps de lecture. */
function wordCount(article: Article): number {
  const parts: string[] = [article.intro];
  for (const section of article.sections) {
    parts.push(section.h2);
    for (const block of section.blocks) {
      if (block.type === 'p') parts.push(block.text);
      else if (block.type === 'list') parts.push(...block.items);
      else if (block.type === 'table') parts.push(...block.head, ...block.rows.flat());
    }
  }
  for (const item of article.faq) parts.push(item.q, item.a);
  return parts
    .join(' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .split(/\s+/)
    .filter(Boolean).length;
}

/** Minutes de lecture, à 200 mots par minute, au moins 1. */
export function readingMinutes(article: Article): number {
  return Math.max(1, Math.round(wordCount(article) / 200));
}

export function formatArticleDate(iso: string): string {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso));
}
