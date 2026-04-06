import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME ?? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
  secure: true,
});

export async function uploadToCloudinary(
  buffer: Buffer,
  folder: string,
  publicId?: string,
  options?: { resourceType?: 'image' | 'raw' | 'auto' },
): Promise<{ url: string; publicId: string }> {
  if (!cloudName || !cloudinaryApiKey || !cloudinaryApiSecret) {
    throw new Error('Configuration Cloudinary manquante (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)');
  }

  return new Promise((resolve, reject) => {
    const opts: Record<string, any> = {
      folder: `yourent/${folder}`,
      resource_type: options?.resourceType ?? 'auto',
    };

    if ((options?.resourceType ?? 'auto') !== 'raw') {
      opts.quality = 'auto:good';
      opts.fetch_format = 'auto';
    }

    if (publicId) opts.public_id = publicId;

    cloudinary.uploader
      .upload_stream(opts, (error, result) => {
        if (error || !result) return reject(error ?? new Error('Cloudinary error'));
        resolve({ url: result.secure_url, publicId: result.public_id });
      })
      .end(buffer);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export function getSignedCloudinaryRawDownloadUrl(sourceUrl: string): string | null {
  try {
    const parsed = new URL(sourceUrl);
    if (parsed.hostname !== 'res.cloudinary.com') return null;

    const marker = '/raw/upload/';
    const markerIndex = parsed.pathname.indexOf(marker);
    if (markerIndex === -1) return null;

    let publicId = parsed.pathname.slice(markerIndex + marker.length);
    publicId = publicId.replace(/^v\d+\//, '');
    if (!publicId) return null;

    return cloudinary.utils.private_download_url(publicId, '', {
      resource_type: 'raw',
      type: 'upload',
      attachment: false,
    });
  } catch {
    return null;
  }
}

export { cloudinary };
