import Link from 'next/link';
import { embedPageLayout } from '../_app';
import { AuthLayout } from '@/components/layouts/auth';

export default function SignIn() {
  return (
    <div>
      Sign up
      <Link href="./sign-up">Sign up</Link>
    </div>
  );
}

embedPageLayout(SignIn, AuthLayout);
