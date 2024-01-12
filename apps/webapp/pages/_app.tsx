import './styles.css';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ProfileProvider } from '../contexts/profile';

type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export function embedPageLayout(
  Component: NextPage,
  layoutWrapper: (page: ReactNode) => ReactElement,
) {
  (Component as NextPageWithLayout).getLayout = layoutWrapper;
}

export default function YasitanApp({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  // Fix hydration error
  // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);

  if (!render) {
    return null;
  }

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page);

  return (
    <ProfileProvider>{getLayout(<Component {...pageProps} />)}</ProfileProvider>
  );
}
