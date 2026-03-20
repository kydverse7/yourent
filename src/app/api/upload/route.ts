import { NextRequest } from 'next/server';
import { auth } from '@/lib/auth';
import { apiError, apiSuccess } from '@/lib/apiHelpers';
import { rateLimit } from '@/lib/rateLimit';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { validateFileMagicBytes } from '@/lib/utils';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const IMAGE_MAX_BYTES = 5 * 1024 * 1024; // 5 Mo
const PDF_MAX_BYTES = 10 * 1024 * 1024; // 10 Mo

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return apiError('Non autorisé', 401);

  const limited = await rateLimit('upload', session.user.id);
  if (!limited.success) return apiError('Limite d\'upload atteinte', 429);

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const folder = (formData.get('folder') as string) ?? 'divers';

  if (!file) return apiError('Aucun fichier fourni', 400);
  if (!ALLOWED_TYPES.includes(file.type)) return apiError('Format non accepté (JPEG, PNG, WebP, PDF)', 415);

  const maxBytes = file.type === 'application/pdf' ? PDF_MAX_BYTES : IMAGE_MAX_BYTES;
  if (file.size > maxBytes) {
    return apiError(
      file.type === 'application/pdf'
        ? 'Fichier PDF trop volumineux (max 10 Mo)'
        : 'Fichier image trop volumineux (max 5 Mo)',
      413,
    );
  }

  // Validation magic bytes (protection contre les faux MIME types)
  const isValid = await validateFileMagicBytes(file);
  if (!isValid) {
    return apiError('Fichier corrompu ou contenu non correspondant', 400);
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const { url, publicId } = await uploadToCloudinary(buffer, folder);
    return apiSuccess({ url, publicId });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur upload Cloudinary';
    return apiError(message, 500);
  }
}
