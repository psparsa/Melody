import Axios, { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

const baseURL = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_HOSTNAME}:${process.env.NEXT_PUBLIC_API_PORT}`;
export const Client = Axios.create({
  baseURL,
});

const errorHandler = (error: unknown) => {
  if (typeof window === 'undefined') return;

  if (isAxiosError(error)) {
    const apiErrorMessage = error.response?.data?.result[0]?.message;
    if (apiErrorMessage) toast.error(apiErrorMessage);
    else toast.error(error.message);
  } else toast.error('An unexpected error occurred');
};

Client.interceptors.response.use((response) => response, errorHandler);
