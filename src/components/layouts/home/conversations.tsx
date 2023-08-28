import { ReactNode, useEffect } from 'react';
import HomeLayout from '.';
import ConversationList from '@/components/conversations/list';
import RootLayout from '..';
import { ConversationMessagesProvider } from '@/contexts/conversation-messages';
import { connect } from '@/integrations/socket';

export default function ConversationsLayout({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    connect();
  }, []);

  return (
    <ConversationMessagesProvider>
      <div className="flex flex-row min-h-screen h-screen">
        <aside className="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform bg-gray-900 duration-150 ease-in h-full flex min-w-[280px]">
          {/* <div className="sidebar-header flex items-center justify-center py-4">
            <div className="inline-flex"></div>
          </div> */}
          <div className="sidebar-content px-2 py-6 h-full w-full">
            <ConversationList></ConversationList>
          </div>
        </aside>
        <main className="main h-full flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in bg-gray-800 h-full">
          <div className="main-content h-full flex flex-col flex-grow">
            {children}
          </div>
          {/* <footer className="footer px-4 py-3">
            <div className="footer-content">
              <p className="text-sm text-gray-600 text-center">
                © Yasitan 2023. All rights reserved.{' '}
                <a href="https://twitter.com/iaminos">by iAmine</a>
              </p>
            </div>
          </footer> */}
        </main>
      </div>
    </ConversationMessagesProvider>
  );
}

export const getLayout = (page: ReactNode) => (
  <RootLayout>
    <HomeLayout>
      <ConversationsLayout>{page}</ConversationsLayout>
    </HomeLayout>
  </RootLayout>
);
