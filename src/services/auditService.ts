import mongoose from 'mongoose';
import { connectDB } from '@/lib/db';
import { AuditLog } from '@/models/AuditLog';

/**
 * Payload simplifié accepté par auditLog().
 * Supporte les alias courants utilisés depuis les routes :
 *   entity  → entityType
 *   userId  → actor (converti en ObjectId si valide)
 *   entityId peut être une string ou un ObjectId
 */
export type SimpleAuditPayload = {
  action: string;
  entityType?: string;
  entity?: string;  // alias → entityType
  entityId?: string | mongoose.Types.ObjectId;
  actor?: string | mongoose.Types.ObjectId;
  userId?: string;  // alias → actor
  actorName?: string;
  actorRole?: string;
  before?: unknown;
  after?: unknown;
  changes?: unknown;
  ip?: string;
  userAgent?: string;
  meta?: unknown;
};

/**
 * Enregistre un événement dans le journal d'audit.
 * L'appel est non-bloquant (fire-and-forget en prod) mais awaitable en test.
 */
export async function auditLog(payload: SimpleAuditPayload): Promise<void> {
  try {
    await connectDB();

    const entityType = payload.entityType ?? payload.entity;
    const rawActor = payload.actor ?? payload.userId;
    const actor =
      rawActor && mongoose.Types.ObjectId.isValid(String(rawActor))
        ? new mongoose.Types.ObjectId(String(rawActor))
        : undefined;
    const entityId =
      payload.entityId && mongoose.Types.ObjectId.isValid(String(payload.entityId))
        ? new mongoose.Types.ObjectId(String(payload.entityId))
        : undefined;

    await AuditLog.create({
      action: payload.action,
      entityType,
      entityId,
      actor,
      actorName: payload.actorName,
      actorRole: payload.actorRole,
      before: payload.before,
      after: payload.after,
      ip: payload.ip,
      userAgent: payload.userAgent,
      meta: payload.changes ? { ...((payload.meta as object) ?? {}), changes: payload.changes } : payload.meta,
    });
  } catch (err) {
    // Le journal d'audit ne doit jamais bloquer une opération métier
    console.error('[AuditLog] Erreur:', err);
  }
}

/**
 * Génère un diff simplifié (before/after) entre deux objets.
 */
export function diff(
  before: Record<string, unknown>,
  after: Record<string, unknown>
): { before: Record<string, unknown>; after: Record<string, unknown> } {
  const changedBefore: Record<string, unknown> = {};
  const changedAfter: Record<string, unknown> = {};

  const allKeys = new Set([...Object.keys(before), ...Object.keys(after)]);
  for (const key of allKeys) {
    if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
      changedBefore[key] = before[key];
      changedAfter[key] = after[key];
    }
  }

  return { before: changedBefore, after: changedAfter };
}
