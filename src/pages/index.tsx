import { Roboto } from 'next/font/google';
import { twJoin } from 'tailwind-merge';

const roboto = Roboto({ weight: ['300', '400', '500'], subsets: ['latin'] });

export default function Home() {
  return (
    <main
      className={twJoin(
        roboto.className,
        'flex min-h-screen w-screen items-center justify-center'
      )}
    >
      Hello World
    </main>
  );
}
