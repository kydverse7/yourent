'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, LogIn, Car, ArrowRight, Sparkles } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';
  const errorParam = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(errorParam ?? '');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email: email.toLowerCase().trim(),
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError('Email ou mot de passe incorrect.');
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.618fr_1fr]">
        <div className="hidden lux-panel overflow-hidden p-10 lg:block">
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-6">
              <span className="lux-eyebrow">
                <Sparkles className="h-3.5 w-3.5" /> espace agence yourent
              </span>
              <h1 className="lux-title max-w-3xl text-5xl">
                Un cockpit d&apos;agence pensé pour piloter une expérience <span className="text-gold-gradient">haut de gamme</span>.
              </h1>
              <p className="lux-subtitle">
                Gestion fluide de la flotte, des clients, des réservations et des finances dans un univers visuel sobre, chic et parfaitement maîtrisé.
              </p>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {[
                ['Design', 'Noir profond, or subtil, surfaces raffinées'],
                ['Pilotage', 'Vision claire de l’activité quotidienne'],
                ['Expérience', 'Un outil à la hauteur d’une agence premium'],
              ].map(([title, text]) => (
                <div key={title} className="lux-panel-muted p-4">
                  <p className="text-sm font-semibold text-cream">{title}</p>
                  <p className="mt-1 text-sm text-cream-faint">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative w-full max-w-md justify-self-center">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-gradient shadow-gold">
              <Car size={28} className="text-black" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-gold-gradient">YOURENT</h1>
            <p className="mt-1 text-sm tracking-wide text-cream-muted">Espace de gestion</p>
          </div>

          <div className="lux-panel p-8">
            <h2 className="mb-6 text-xl font-bold text-cream">Connexion</h2>

            {error && (
              <div className="mb-5 flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-400">
                <span className="h-4 w-4 shrink-0">⚠</span>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-cream-muted" htmlFor="email">
                  Adresse email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-gold"
                  placeholder="vous@yourent.ma"
                  required
                  autoComplete="email"
                  autoFocus
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-cream-muted" htmlFor="password">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-gold pr-11"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-faint transition-colors hover:text-cream-muted"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-gold mt-2 w-full" disabled={loading}>
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/50 border-t-black" />
                    Connexion…
                  </>
                ) : (
                  <>
                    <LogIn size={16} />
                    <span>Se connecter</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-cream-faint">
            © {new Date().getFullYear()} Yourent — Accès réservé au personnel autorisé
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
