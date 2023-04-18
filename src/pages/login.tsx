import 'react-toastify/dist/ReactToastify.css';
// import { LoginForm } from '@/components/common';
import { Roboto } from 'next/font/google';
import Head from 'next/head';
import React from 'react';
import { twJoin } from 'tailwind-merge';
import { LoginForm } from '@/components/common/login-form';

const roboto = Roboto({ weight: ['300', '400', '500'], subsets: ['latin'] });

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <main
        className={twJoin(
          roboto.className,
          'flex min-h-screen w-screen items-center justify-center bg-chineseBlack'
        )}
      >
        <LoginForm containerClassName="my-4" />
      </main>
    </>
  );
};

export default LoginPage;
