import { joiResolver } from '@hookform/resolvers/joi';
import { Login } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import Joi from 'joi';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import BaseModal from '@/components/shared/BaseModal';
import { login, LoginParams } from '@/services/auth';
import { ServerError } from '@/services/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

type FormData = {
  identifier: string;
  password: string;
};

const schema = Joi.object({
  identifier: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const LoginModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { open: isOpen } = useAppSelector((state) => state.modal['auth.login']);

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: joiResolver(schema) });

  const { mutate, isLoading } = useMutation<void, ServerError, LoginParams>(login);

  const handleClose = () => {
    reset();
    dispatch(setModalState({ modal: 'auth.login', state: { open: false } }));
  };

  const onSubmit = ({ identifier, password }: FormData) => {
    mutate(
      { identifier, password },
      {
        onSuccess: handleClose,
      },
    );
  };

  const handleCreateAccount = () => {
    handleClose();
    dispatch(setModalState({ modal: 'auth.register', state: { open: true } }));
  };

  const handleRecoverAccount = () => {
    handleClose();
    dispatch(setModalState({ modal: 'auth.forgot', state: { open: true } }));
  };

  return (
    <BaseModal
      icon={<Login />}
      isOpen={isOpen}
      heading="Login to your account"
      handleClose={handleClose}
      handleSubmit={handleSubmit(onSubmit)}
      footerChildren={
        <Button type="submit" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
          Login
        </Button>
      }
    >
      <p>
        Please enter your <strong>username or email address</strong> and the{' '}
        <strong>password</strong> associated with your account to login and access your data.
      </p>

      <form className="my-3 grid gap-6">
        <Controller
          name="identifier"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              label="Username"
              error={!!fieldState.error}
              helperText={fieldState.error?.message || 'You can also enter your email address.'}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              type="password"
              label="Password"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </form>

      <p className="text-xs">
        If you don&apos;t have one, you can <a onClick={handleCreateAccount}>create an account</a>{' '}
        here.
      </p>

      <p className="text-xs">
        In case you have forgotten your password, you can{' '}
        <a onClick={handleRecoverAccount}>recover your account</a> here.
      </p>
    </BaseModal>
  );
};

export default LoginModal;
