import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'admin' | 'agent' | 'comptable';
  status: 'active' | 'suspended';
  permissions: string[];
  preferences: {
    langue: 'fr' | 'ar';
    notificationsEmail: boolean;
  };
  lastLoginAt?: Date;
  inviteToken?: string;
  inviteTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    name: { type: String, required: true, trim: true },
    phone: String,
    avatar: String,
    role: {
      type: String,
      enum: ['admin', 'agent', 'comptable'],
      default: 'agent',
      index: true,
    },
    status: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active',
    },
    permissions: [String],
    preferences: {
      langue: { type: String, enum: ['fr', 'ar'], default: 'fr' },
      notificationsEmail: { type: Boolean, default: true },
    },
    lastLoginAt: Date,
    inviteToken: { type: String, select: false },
    inviteTokenExpiry: { type: Date, select: false },
  },
  { timestamps: true }
);

// Ne jamais exposer passwordHash dans les réponses
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  delete obj.inviteToken;
  delete obj.inviteTokenExpiry;
  return obj;
};

export const User = models.User || model<IUser>('User', UserSchema);
