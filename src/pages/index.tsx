import { getLayout } from '@/components/layouts/home';
import { embedPageLayout } from './_app';
import { useProfileState } from '@/contexts/profile';
import Link from 'next/link';

export default function Page() {
  const { user } = useProfileState();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <h1>Welcome {user?.email}</h1>
        <h3>
          Let&apos;s explore the Yasitan!&nbsp;
          <Link
            className="font-medium text-cyan-200 hover:underline"
            href="/conversations/new"
          >
            Start a new conversation
          </Link>
          &nbsp;🚀
        </h3>
      </div>
    </main>
  );
}

embedPageLayout(Page, getLayout);
