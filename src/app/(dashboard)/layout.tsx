import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { DashboardModals } from '@/components/dashboard/DashboardModals';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect('/login');
  if (session.user.status === 'suspended') redirect('/login?error=Compte+suspendu');

  return (
    <div className="flex min-h-screen bg-noir-root">
      <DashboardModals />

      <Sidebar userRole={session.user.role} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          userName={session.user.name ?? session.user.email ?? 'Utilisateur'}
          userRole={session.user.role}
          userAvatar={session.user.image ?? undefined}
        />
        <main className="flex-1 overflow-y-auto px-4 pb-6 pt-4 md:px-6 lg:px-8">
          <div className="mx-auto max-w-[1680px] animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
