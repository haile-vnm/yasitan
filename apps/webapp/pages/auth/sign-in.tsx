import { getCurrentUser, signIn } from '@/integrations/api';
import { setField } from '@/lib/local-storage';
import { useState } from 'react';
import { setUser, useProfileDispatch } from '@/contexts/profile';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/shared/app-logo';
import SignInForm from '@/components/auth/sign-in-form';
import If from '@/components/shared/if';
import Link from 'next/link';
import { embedPageLayout } from '../_app';
import { getLayout } from '@/components/layouts/auth';

export default function SignIn() {
  const [error, setError] = useState('');
  const router = useRouter();
  const profileDispatch = useProfileDispatch();
  const login = (data: { email: string; password: string }) => {
    const { email, password } = data;
    signIn(email, password)
      .then(data => {
        setField('access-token', data.token);
        getCurrentUser().then(user => {
          setUser(profileDispatch, user);
          router.push('/');
        });
      })
      .catch(err => setError(err?.error));
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <AppLogo></AppLogo>
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-cyan-200">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignInForm submit={login}></SignInForm>
        <If condition={error}>
          <div className="my-4 text-red-600 text-xs">{error}</div>
        </If>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?&nbsp;
          <Link
            className="font-medium text-cyan-200 hover:underline"
            href="./sign-up"
          >
            Register new account
          </Link>
        </p>
      </div>
    </div>
  );
}

embedPageLayout(SignIn, getLayout);
