import { ReactNode } from 'react';
import HomeLayout from '.';
import ConversationList from '@/components/conversations/list';
import RootLayout from '..';

export default function ConversationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <HomeLayout>
      <div className="flex flex-row min-h-screen">
        <aside className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform bg-gray-900 duration-150 ease-in">
          <div className="sidebar-header flex items-center justify-center py-4">
            <div className="inline-flex"></div>
          </div>
          <div className="sidebar-content px-2 py-6">
            <ConversationList></ConversationList>
          </div>
        </aside>
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in bg-gray-800">
          <div className="main-content flex flex-col flex-grow p-4">
            {children}
          </div>
          <footer className="footer px-4 py-6">
            <div className="footer-content">
              <p className="text-sm text-gray-600 text-center">
                © Yasitan 2023. All rights reserved.{' '}
                <a href="https://twitter.com/iaminos">by iAmine</a>
              </p>
            </div>
          </footer>
        </main>
      </div>
    </HomeLayout>
  );
}

export const getLayout = (page: ReactNode) => (
  <RootLayout>
    <HomeLayout>
      <ConversationsLayout>{page}</ConversationsLayout>
    </HomeLayout>
  </RootLayout>
);
