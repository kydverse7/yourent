import type { MetadataRoute } from 'next';
import { connectDB } from '@/lib/db';
import { Vehicle } from '@/models/Vehicle';
import { toModelSlug } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourent.ma';

  /* ── Static pages ── */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/catalogue`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  /* ── Dynamic model pages (grouped by marque+modele) ── */
  let vehiclePages: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const vehicles = await Vehicle.find({
      actif: { $ne: false },
      isPublic: { $ne: false },
    })
      .select('marque modele updatedAt')
      .lean();

    const slugMap = new Map<string, Date>();
    for (const v of vehicles) {
      const ms = toModelSlug((v as any).marque, (v as any).modele);
      const updatedAt = (v as any).updatedAt ?? new Date();
      const existing = slugMap.get(ms);
      if (!existing || updatedAt > existing) {
        slugMap.set(ms, updatedAt);
      }
    }

    vehiclePages = [...slugMap.entries()].map(([slug, lastMod]) => ({
      url: `${baseUrl}/catalogue/${slug}`,
      lastModified: lastMod,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch {
    // Si la DB n'est pas dispo au build, on génère quand même les pages statiques
  }

  return [...staticPages, ...vehiclePages];
}
