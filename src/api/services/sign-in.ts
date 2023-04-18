import { Client } from '../';
import { z } from 'zod';

export const SignInSchema = z.object({
  ok: z.boolean(),
  result: z.object({
    access_token: z.string(),
    access_token_expration: z.string(),
  }),
});

export type SignInResponse = z.infer<typeof SignInSchema>;

type SignInProperties = Record<'username' | 'password', string>;

export const signin = async ({ username, password }: SignInProperties) => {
  const { data } = await Client.post<SignInResponse>('/site/login', {
    username,
    password,
  });

  return SignInSchema.parse(data);
};
