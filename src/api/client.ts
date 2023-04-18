import Axios, { isAxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const baseURL = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOSTNAME}:${process.env.NEXT_PUBLIC_API_PORT}`;
export const Client = Axios.create({
  baseURL,
});

const errorHandler = (error: unknown) => {
  if (typeof window !== 'undefined')
    if (isAxiosError(error)) {
      const apiErrorMessage = error.response?.data?.result[0]?.message;
      if (apiErrorMessage) toast.error(apiErrorMessage);
      else toast.error(error.message);
    } else toast.error('An unexpected error occurred');

  return Promise.reject(error);
};

Client.interceptors.response.use((response) => response, errorHandler);

const requestMiddleware = (
  request: InternalAxiosRequestConfig<unknown>
): InternalAxiosRequestConfig<unknown> => {
  if (typeof window !== 'undefined') {
    const token = Cookies.get('token');
    if (token) request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
};

Client.interceptors.request.use(requestMiddleware);
