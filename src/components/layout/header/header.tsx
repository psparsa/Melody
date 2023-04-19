import { useAuth } from '@/utils/use-auth';

export const Header = () => {
  const { logoutUser } = useAuth();

  return (
    <header className="flex w-screen  items-center bg-chineseBlack p-2">
      <div
        className="flex cursor-pointer flex-col items-center"
        onClick={logoutUser}
      >
        <div className="text-xl text-coralRed">Logout</div>
        <div className="mt-1 w-14 border-b-2 border-solid border-coralRed"></div>
      </div>
    </header>
  );
};
