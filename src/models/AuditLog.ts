import { Schema, model, models, Document, Types } from 'mongoose';

type EntityType =
  | 'Vehicle'
  | 'Client'
  | 'Reservation'
  | 'Location'
  | 'Payment'
  | 'EtatDesLieux'
  | 'Maintenance'
  | 'Expense'
  | 'User'
  | 'Agence';

type Action = 'create' | 'update' | 'delete' | 'login' | 'logout' | 'blacklist' | 'unblacklist' | 'payment' | 'caution' | 'start' | 'close' | 'terminate' | 'prolong' | 'accept' | 'reject';

export interface IAuditLog extends Document {
  actor?: Types.ObjectId;
  actorName?: string;
  actorRole?: string;
  action: Action;
  entityType: EntityType;
  entityId?: Types.ObjectId;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  meta?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    actor: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    actorName: String,
    actorRole: String,
    action: {
      type: String,
      enum: ['create', 'update', 'delete', 'login', 'logout', 'blacklist', 'unblacklist', 'payment', 'caution', 'start', 'close', 'terminate', 'prolong', 'accept', 'reject'],
      required: true,
      index: true,
    },
    entityType: {
      type: String,
      enum: ['Vehicle', 'Client', 'Reservation', 'Location', 'Payment', 'EtatDesLieux', 'Maintenance', 'Expense', 'User', 'Agence'],
      required: true,
      index: true,
    },
    entityId: { type: Schema.Types.ObjectId, index: true },
    before: Schema.Types.Mixed,
    after: Schema.Types.Mixed,
    meta: Schema.Types.Mixed,
    ip: String,
    userAgent: String,
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    capped: { size: 100 * 1024 * 1024, max: 100_000 }, // 100MB max ~100k logs
  }
);

AuditLogSchema.index({ createdAt: -1 });

export const AuditLog = models.AuditLog || model<IAuditLog>('AuditLog', AuditLogSchema);
