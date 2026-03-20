import { Redis } from '@upstash/redis';

// Le client Redis est initialisé au démarrage mais ne lance pas d'erreur si les
// variables d'environnement sont absentes (build-time sans env).
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL ?? 'http://localhost',
  token: process.env.UPSTASH_REDIS_REST_TOKEN ?? 'placeholder',
});
