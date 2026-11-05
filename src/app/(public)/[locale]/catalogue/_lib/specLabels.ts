type Translate = (key: string) => string;

/** Valeur de la base traduite (`model.fuel.diesel`...). Une valeur sans traduction reste affichée telle quelle. */
function label(t: Translate, group: 'fuel' | 'gear' | 'category', value?: string): string {
  if (!value) return '';
  const key = `model.${group}.${value}`;
  const translated = t(key);
  return translated === key ? value : translated;
}

export const fuelLabel = (t: Translate, value?: string) => label(t, 'fuel', value);
export const gearLabel = (t: Translate, value?: string) => label(t, 'gear', value);
export const categoryLabel = (t: Translate, value?: string) => label(t, 'category', value);
