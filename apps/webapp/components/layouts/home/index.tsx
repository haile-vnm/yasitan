import { ReactNode, useEffect, useState } from 'react';
import RootLayout from '..';
import { useProfileState } from '@/contexts/profile';
import { useRouter } from 'next/navigation';
import If from '@/components/shared/if';

export default function HomeLayout({ children }: { children: ReactNode }) {
  const [render, setRender] = useState(false);
  const { user } = useProfileState();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      return router.push('/auth/sign-in');
    }

    setRender(true);
  }, []);
  return <If condition={render}>{children}</If>;
}

export const getLayout = (page: ReactNode) => (
  <RootLayout>
    <HomeLayout>{page}</HomeLayout>
  </RootLayout>
);
