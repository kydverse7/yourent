import { Schema, model, models, Document, Types } from 'mongoose';

export interface INotification extends Document {
  recipient?: Types.ObjectId;
  recipientPhone?: string;
  recipientEmail?: string;
  canal: 'email' | 'sms' | 'whatsapp';
  type: 'confirmation' | 'rejet' | 'rappel' | 'retard' | 'remerciement' | 'invitation' | 'autre';
  sujet?: string;
  corps: string;
  statut: 'en_attente' | 'envoyee' | 'echec';
  erreur?: string;
  tentatives: number;
  externalId?: string; // ID Resend ou Twilio
  reservation?: Types.ObjectId;
  location?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    recipient: { type: Schema.Types.ObjectId, ref: 'User' },
    recipientPhone: String,
    recipientEmail: String,
    canal: { type: String, enum: ['email', 'sms', 'whatsapp'], required: true },
    type: {
      type: String,
      enum: ['confirmation', 'rejet', 'rappel', 'retard', 'remerciement', 'invitation', 'autre'],
      required: true,
    },
    sujet: String,
    corps: { type: String, required: true },
    statut: {
      type: String,
      enum: ['en_attente', 'envoyee', 'echec'],
      default: 'en_attente',
      index: true,
    },
    erreur: String,
    tentatives: { type: Number, default: 0 },
    externalId: String,
    reservation: { type: Schema.Types.ObjectId, ref: 'Reservation' },
    location: { type: Schema.Types.ObjectId, ref: 'Location' },
  },
  { timestamps: true }
);

export const Notification = models.Notification || model<INotification>('Notification', NotificationSchema);
