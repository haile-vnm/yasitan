import { ReactNode } from 'react';
import RootLayout from '../root';

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <RootLayout>
      {children}
    </RootLayout>
  );
}
