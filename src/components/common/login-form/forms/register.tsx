import { Input } from '@/components/common/input';
import { Button } from '@/components/common/button';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { signin, signup } from '@/api';
import { useAuth } from '@/utils/use-auth';

const schema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'Your First name is too long!' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(30, { message: 'Your Last name is too long!' }),
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .max(40, { message: 'Username is too long!' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(60, { message: 'Password is too long!' }),
});

type FormValues = z.infer<typeof schema>;

export const Register = () => {
  const { loginUser } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formValues: FormValues) => {
    try {
      const data = await signup(formValues);

      if (data.ok) {
        const signInData = await signin({
          username: formValues.username,
          password: formValues.password,
        });

        const expires = new Date(signInData.result.access_token_expration);

        loginUser({ token: signInData.result.access_token, expires });
      } else toast.error('An error occurred during your account registration!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      {!!errors.firstName?.message && (
        <div className="mb-2 w-full text-center text-begonia">
          {errors.firstName.message}
        </div>
      )}
      <Controller
        name="firstName"
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid },
        }) => (
          <Input
            placeHolder="Enter your first name"
            inputRef={ref}
            {...{ onChange, onBlur, value, name, invalid }}
          />
        )}
      />

      {!!errors.lastName?.message && (
        <div className="mb-2 w-full text-center text-begonia">
          {errors.lastName.message}
        </div>
      )}
      <Controller
        name="lastName"
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid },
        }) => (
          <Input
            placeHolder="Enter your last name"
            inputRef={ref}
            {...{ onChange, onBlur, value, name, invalid }}
            containerClassName="mt-3"
          />
        )}
      />

      {!!errors.username?.message && (
        <div className="mt-2 w-full text-center text-begonia">
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
            placeHolder="Enter a username"
            inputRef={ref}
            {...{ onChange, onBlur, value, name, invalid }}
            containerClassName="mt-3"
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
            placeHolder="Enter a password"
            inputRef={ref}
            {...{ onChange, onBlur, value, name, invalid }}
            containerClassName="mt-3"
            secret={true}
          />
        )}
      />

      <div className="mt-4 w-36" data-testid="register-button">
        <Button
          variant="red"
          fluid={true}
          type="submit"
          disable={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Register'}
        </Button>
      </div>
    </form>
  );
};
