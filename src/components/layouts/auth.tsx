import { ReactNode } from 'react';
import RootLayout from './root';

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayout>
      Auth layout
      {children}
    </RootLayout>
  );
}
