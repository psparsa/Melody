import { useAuth } from '@/utils/use-auth';

export const Header = () => {
  const { logoutUser } = useAuth();

  return (
    <div
      className="flex w-screen cursor-pointer items-center p-2"
      onClick={logoutUser}
    >
      <div className="flex flex-col items-center">
        <div className="text-xl text-coralRed">Logout</div>
        <div className="mt-1 w-14 border-b-2 border-solid border-coralRed"></div>
      </div>
    </div>
  );
};
