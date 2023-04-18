import Image from 'next/image';
import Link from 'next/link';
import StudioImage from '@/assets/studio.jpeg';
import { TbArrowBackUp } from 'react-icons/tb';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import { Login } from './forms/login';
import { Register } from './forms/register';

interface LoginFormProperties {
  containerClassName?: string;
}
export const LoginForm = ({ containerClassName }: LoginFormProperties) => {
  const router = useRouter();
  const isRegisterMode = !!router.query.register;

  return (
    <div
      className={twMerge(
        containerClassName,
        'w-5/6 flex-col rounded-lg bg-chineseBlackVoid shadow-md sm:w-100'
      )}
    >
      <div className="flex h-20 w-full items-center justify-center overflow-hidden rounded-t-lg">
        <Image src={StudioImage} alt="studio" />
        <div className="absolute h-20  w-5/6 rounded-t-lg bg-chineseBlack opacity-40 sm:w-100"></div>
      </div>

      <div className="flex w-full flex-col items-center justify-center py-8">
        {isRegisterMode ? <Register /> : <Login />}

        <Link
          href={isRegisterMode ? '/login' : '/login?register=true'}
          shallow={true}
        >
          <div className="mt-6 flex cursor-pointer">
            <p className="text-gray-400">or</p>
            <p className="ml-1 text-snow">
              {isRegisterMode
                ? 'Login to your existing account'
                : 'Register a new account'}
            </p>
            <div className="ml-1 mt-1">
              <TbArrowBackUp color="snow" size={18} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
