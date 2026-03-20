import NextAuth, { type DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { connectDB } from './db';
import { User } from '@/models/User';
import { z } from 'zod';

// Extension du type Session pour inclure les champs custom
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'admin' | 'agent' | 'comptable';
      status: 'active' | 'suspended';
    } & DefaultSession['user'];
  }
  interface User {
    role: 'admin' | 'agent' | 'comptable';
    status: 'active' | 'suspended';
  }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 }, // 30 jours

  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        await connectDB();
        // select('+passwordHash') car passwordHash est exclu par défaut
        const user = await User.findOne({ email: parsed.data.email }).select('+passwordHash').lean();
        if (!user || !user.passwordHash) return null;
        if (user.status === 'suspended') return null;

        const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!valid) return null;

        // Mettre à jour lastLoginAt sans await bloquant
        User.findByIdAndUpdate(user._id, { lastLoginAt: new Date() }).exec();

        return {
          id: String(user._id),
          email: user.email,
          name: user.name,
          image: user.avatar ?? null,
          role: user.role,
          status: user.status,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'admin' | 'agent' | 'comptable';
        session.user.status = token.status as 'active' | 'suspended';
      }
      return session;
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },
});
