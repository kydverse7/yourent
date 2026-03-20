import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

/**
 * Protection CSRF basique : vérifie que la requête provient du même origine.
 * À appeler sur TOUS les POST / PUT / DELETE de l'API dashboard.
 */
export async function assertSameOrigin(req: NextRequest): Promise<void> {
  const origin = req.headers.get('origin');
  const host = req.headers.get('host');

  if (!origin || !host) {
    throw new CsrfError('En-têtes origin/host manquants');
  }

  const originHost = new URL(origin).host;
  if (originHost !== host) {
    throw new CsrfError(`Origin non autorisée: ${origin}`);
  }
}

export class CsrfError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CsrfError';
  }
}
