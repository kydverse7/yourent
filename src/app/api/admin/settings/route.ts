import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Agence } from '@/models/Agence';
import { z } from 'zod';

const settingsUpdateSchema = z.object({
  highSeason: z.boolean().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  if (!['admin', 'agent'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
  }

  await connectDB();
  const agence = await Agence.findOne().lean();
  if (!agence) return NextResponse.json({ error: 'Agence non configurée' }, { status: 404 });

  return NextResponse.json({
    data: {
      highSeason: agence.parametres?.highSeason ?? false,
    },
  });
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  if (!['admin', 'agent'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Accès interdit' }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps JSON invalide' }, { status: 400 });
  }

  const parsed = settingsUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides' }, { status: 422 });
  }

  await connectDB();
  const agence = await Agence.findOne();
  if (!agence) return NextResponse.json({ error: 'Agence non configurée' }, { status: 404 });

  if (parsed.data.highSeason !== undefined) {
    agence.parametres.highSeason = parsed.data.highSeason;
    await agence.save();
  }

  return NextResponse.json({
    data: {
      highSeason: agence.parametres.highSeason,
    },
  });
}
