import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/common/input';
import { Button } from '@/components/common/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signin } from '@/api';
import { useAuth } from '@/utils/use-auth';

const schema = z.object({
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .max(40, { message: 'Username is too long!' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(60, { message: 'Password is too long!' }),
});

type FormValues = z.infer<typeof schema>;

export const Login = () => {
  const { loginUser } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formValues: FormValues) => {
    try {
      const data = await signin({
        username: formValues.username,
        password: formValues.password,
      });

      const expires = new Date(data.result.access_token_expration);

      loginUser({
        token: data.result.access_token,
        expires,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {!!errors.username?.message && (
        <div className="mb-2 w-full text-center text-begonia">
          {errors.username.message}
        </div>
      )}
      <Controller
        name="username"
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid },
        }) => (
          <Input
            placeHolder="Enter your username"
            inputRef={ref}
            {...{ onChange, onBlur, value, name, invalid }}
          />
        )}
      />

      {!!errors.password?.message && (
        <div className="mt-2 w-full text-center text-begonia">
          {errors.password.message}
        </div>
      )}
      <Controller
        name="password"
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid },
        }) => (
          <Input
            placeHolder="Enter your password"
            secret={true}
            containerClassName="mt-3"
            inputRef={ref}
            {...{ onChange, onBlur, value, name, invalid }}
          />
        )}
      />

      <div className="mt-4 w-36" data-testid="login-button">
        <Button
          variant="dark"
          fluid={true}
          type="submit"
          disable={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Login'}
        </Button>
      </div>
    </form>
  );
};
