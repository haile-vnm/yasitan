import { embedPageLayout } from '../_app';
import Link from 'next/link';
import { AuthLayout } from '@/components/layouts/auth';

export default function SignUp() {
  return (
    <div>
      Sign up
      <Link href="./sign-in">Sign in</Link>
    </div>
  );
}

embedPageLayout(SignUp, AuthLayout)
