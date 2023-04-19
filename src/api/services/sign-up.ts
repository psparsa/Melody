import { Client } from '..';
import { z } from 'zod';

export const SignUpSchema = z.object({
  ok: z.boolean(),
  result: z.object({
    first_name: z.string(),
    last_name: z.string(),
    username: z.string(),
    id: z.number(),
  }),
});

export type SignUpResponse = z.infer<typeof SignUpSchema>;

type SignUpProperties = Record<
  'firstName' | 'lastName' | 'username' | 'password',
  string
>;

export const signup = async ({
  firstName,
  lastName,
  username,
  password,
}: SignUpProperties) => {
  const { data } = await Client.post<SignUpResponse>('/site/register', {
    first_name: firstName,
    last_name: lastName,
    username,
    password,
  });

  return SignUpSchema.parse(data);
};
