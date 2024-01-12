import styles from './index.module.scss';
import { embedPageLayout } from './_app';
import Link from 'next/link';
import { useProfileState } from '../contexts/profile';
import { getLayout } from '../components/layouts/home';

export default function Page() {
  const { user } = useProfileState();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center">
        <h1 className="mb-3">Welcome {user?.email}</h1>
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
