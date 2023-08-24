import { ReactElement, ReactNode, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export function embedPageLayout(
  Component: NextPage,
  Layout: ({ children }: { children: ReactNode }) => ReactElement
) {
  (Component as NextPageWithLayout).getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function YasitanApp({
  Component,
  pageProps,
}: AppPropsWithLayout) {
  // Fix hydration error
  // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), [])

  if (!render) {
    return null;
  }

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? (page => page);

  return getLayout(<Component {...pageProps} />);
}
