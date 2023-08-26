import { ReactNode, useEffect, useState } from 'react';
import RootLayout from '.';
import { useProfileState } from '@/contexts/profile';
import { useRouter } from 'next/navigation';
import If from '../shared/if';

export function AuthLayout({ children }: { children: ReactNode }) {
  const [render, setRender] = useState(false);
  const { user } = useProfileState();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      return router.push('/');
    }

    setRender(true);
  }, []);

  return <If condition={render}>{children}</If>;
}

export const getLayout = (page: ReactNode) => (
  <RootLayout>
    <AuthLayout>{page}</AuthLayout>
  </RootLayout>
);
