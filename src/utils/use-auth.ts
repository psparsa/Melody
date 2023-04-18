import React from 'react';
import { useRouter } from 'next/router';
import { deleteCookie, getCookie, setCookies } from 'cookies-next';

export const useAuth = () => {
  const router = useRouter();
  const [token, setToken] = React.useState(getCookie('token')?.toString());

  const isAuthenticated = !!token;

  const loginUser = ({ token, expires }: { token: string; expires: Date }) => {
    setCookies('token', token, { expires });
    setToken(token);
    void router.replace('/');
  };

  const logoutUser = () => {
    deleteCookie('token');
    // eslint-disable-next-line unicorn/no-useless-undefined
    setToken(undefined);
    void router.replace('/login');
  };

  React.useEffect(() => {
    const updateToken = () => setToken(getCookie('token')?.toString());

    window.addEventListener('focus', updateToken);
    return () => window.removeEventListener('focus', updateToken);
  }, []);

  return {
    isAuthenticated,
    loginUser,
    logoutUser,
  };
};
