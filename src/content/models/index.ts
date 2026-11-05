import type { Locale } from '@/lib/i18n/translations';
import type { ModelCopy } from '../types';
import ar from './ar';
import en from './en';
import fr from './fr';

const COPY: Record<Locale, Record<string, ModelCopy>> = { fr, en, ar };

export function getModelCopy(slug: string, locale: Locale): ModelCopy | undefined {
  return COPY[locale][slug];
}
