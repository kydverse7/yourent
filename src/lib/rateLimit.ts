import { redis } from './redis';
import { NextResponse } from 'next/server';

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Configs prédéfinies.
 */
export const RATE_LIMITS = {
  /** 60 req/min — routes dashboard générales */
  general: { limit: 60, windowMs: 60_000, keyPrefix: 'rl:gen' },
  /** 5 tentatives / 10 min — login */
  login: { limit: 5, windowMs: 600_000, keyPrefix: 'rl:auth' },
  /** 5 soumissions / 10 min / IP — formulaire public */
  publicReserve: { limit: 5, windowMs: 600_000, keyPrefix: 'rl:pub' },
  /** 10 req/min — upload */
  upload: { limit: 10, windowMs: 60_000, keyPrefix: 'rl:upl' },
} as const;

type PresetName = keyof typeof RATE_LIMITS;

/**
 * Sliding window rate limiter via Upstash Redis.
 * Usage : await rateLimit('general', userId)
 */
export async function rateLimit(
  preset: PresetName,
  identifier: string,
): Promise<RateLimitResult> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL ?? '';
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN ?? '';

  const shouldBypassRedis =
    process.env.NODE_ENV !== 'production'
    || !redisUrl
    || !redisToken
    || redisUrl.includes('localhost')
    || redisToken === 'placeholder';

  if (shouldBypassRedis) {
    return {
      success: true,
      remaining: Number.MAX_SAFE_INTEGER,
      resetAt: Date.now() + RATE_LIMITS[preset].windowMs,
    };
  }

  const { limit, windowMs, keyPrefix } = RATE_LIMITS[preset];
  const key = `${keyPrefix}:${identifier}`;
  const now = Date.now();
  const windowStart = now - windowMs;

  const pipe = redis.pipeline();
  pipe.zremrangebyscore(key, 0, windowStart); // supprimer les anciens
  pipe.zadd(key, { score: now, member: `${now}-${Math.random()}` });
  pipe.zcard(key);
  pipe.pexpire(key, windowMs);

  try {
    const results = await pipe.exec();
    const count = (results[2] as number) ?? 0;

    return {
      success: count <= limit,
      remaining: Math.max(0, limit - count),
      resetAt: now + windowMs,
    };
  } catch (error) {
    console.warn(`[rateLimit] Redis indisponible pour ${preset}, bypass appliqué`, error);
    return {
      success: true,
      remaining: Number.MAX_SAFE_INTEGER,
      resetAt: now + windowMs,
    };
  }
}

/**
 * Helper pour retourner une 429 si rate limit dépassé.
 */
export async function withRateLimit(
  preset: PresetName,
  identifier: string,
  handler: () => Promise<NextResponse>,
): Promise<NextResponse> {
  const result = await rateLimit(preset, identifier);
  if (!result.success) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Veuillez patienter.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(RATE_LIMITS[preset].windowMs / 1000)),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(result.resetAt),
        },
      },
    );
  }
  return handler();
}
