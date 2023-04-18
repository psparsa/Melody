import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const router = useRouter();
  const [token, setToken] = React.useState(Cookies.get('token'));

  const isAuthenticated = !!token;

  const loginUser = ({ token, expires }: { token: string; expires: Date }) => {
    Cookies.set('token', token, { expires });
    setToken(token);
    void router.replace('/');
  };

  const logoutUser = () => {
    Cookies.remove('token');
    // eslint-disable-next-line unicorn/no-useless-undefined
    setToken(undefined);
    void router.replace('/login');
  };

  React.useEffect(() => {
    const updateToken = () => setToken(Cookies.get('token'));

    window.addEventListener('focus', updateToken);
    return () => window.removeEventListener('focus', updateToken);
  }, []);

  return {
    isAuthenticated,
    loginUser,
    logoutUser,
  };
};