import type { Article } from '../types';

/** Articles du blog, en français pour l'instant. Le plus récent en premier. */
export const ARTICLES: Article[] = [];

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}
