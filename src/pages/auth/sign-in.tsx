import Link from 'next/link';
import { embedPageLayout } from '../_app';
import { getLayout } from '@/components/layouts/auth';

export default function SignIn() {
  return (
    <div>
      Sign In
      <Link href="./sign-up">Sign up</Link>
    </div>
  );
}

embedPageLayout(SignIn, getLayout);
