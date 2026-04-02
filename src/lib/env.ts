import { z } from 'zod';

const envSchema = z.object({
  // MongoDB
  MONGODB_URI: z.string().min(1, 'MONGODB_URI requis'),

  // NextAuth v5
  AUTH_SECRET: z.string().min(32, 'AUTH_SECRET doit faire min 32 chars'),
  NEXTAUTH_URL: z.string().url().optional(),

  // Cloudinary
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),

  // Resend (optional — notifications disabled if missing)
  RESEND_API_KEY: z.string().optional(),

  // Twilio (optional — SMS/WhatsApp disabled if missing)
  TWILIO_ACCOUNT_SID: z.string().optional(),
  TWILIO_AUTH_TOKEN: z.string().optional(),
  TWILIO_PHONE_NUMBER: z.string().optional(),
  TWILIO_WHATSAPP_NUMBER: z.string().optional(),

  // Upstash Redis (optional — rate-limiting disabled if missing)
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // App
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_APP_NAME: z.string().default('Yourent'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
});

/**
 * Valide les variables d'environnement au démarrage.
 * Lève une erreur explicite si une variable critique est manquante.
 */
function validateEnv() {
  // En développement on tolère les variables manquantes (seed, tests)
  if (process.env.NODE_ENV === 'test') return process.env as unknown as z.infer<typeof envSchema>;

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('❌ Variables d\'environnement invalides :');
    console.error(parsed.error.flatten().fieldErrors);
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Variables d\'environnement manquantes ou invalides. Voir logs ci-dessus.');
    }
  }
  return (parsed.success ? parsed.data : process.env) as z.infer<typeof envSchema>;
}

export const env = validateEnv();
