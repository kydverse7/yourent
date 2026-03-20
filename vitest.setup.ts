// Vitest global setup
import { vi } from 'vitest';

// Mock des modules serveur (next-auth, db, redis, etc.)
vi.mock('@/lib/db', () => ({
  connectDB: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@/lib/redis', () => ({
  redis: {
    pipeline: vi.fn(() => ({ zadd: vi.fn(), zremrangebyscore: vi.fn(), zcard: vi.fn(), expire: vi.fn(), exec: vi.fn().mockResolvedValue([null, null, 0, null]) })),
  },
}));
