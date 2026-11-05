import { PrivateDocument, privateMetadata, privateViewport } from '@/components/layout/PrivateDocument';

export const metadata = privateMetadata;
export const viewport = privateViewport;

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <PrivateDocument>{children}</PrivateDocument>;
}
