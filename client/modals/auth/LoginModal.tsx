import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';

import BaseModal from '@/components/shared/BaseModal';
import { login } from '@/services/auth';
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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: joiResolver(schema) });

  const handleClose = () => {
    reset();
    dispatch(setModalState({ modal: 'auth.login', state: { open: false } }));
  };

  const onSubmit = async ({ identifier, password }: FormData) => {
    try {
      await login({ identifier, password });
      handleClose();
    } catch {
      // pass through
    }
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
    <>
      <BaseModal
        isOpen={isOpen}
        heading="Login to your account"
        handleClose={handleClose}
        footerChildren={
          <button className="btn" type="submit" onClick={handleSubmit(onSubmit)}>
            Login
          </button>
        }
      >
        <div className="grid gap-4">
          <p>
            Please enter your <strong>username or email address</strong> and the{' '}
            <strong>password</strong> associated with your account to login and access your data.
          </p>

          <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="form-control">
              <span>Username/Email Address</span>
              <input type="text" {...register('identifier', { required: true })} />
              {errors.identifier ? (
                <span className="error">{errors.identifier.message}</span>
              ) : null}
            </label>

            <label className="form-control">
              <span>Password</span>
              <input type="password" {...register('password')} />
              {errors.password ? <span className="error">{errors.password.message}</span> : null}
            </label>
          </form>

          <p className="text-xs">
            If you don&apos;t have one, you can{' '}
            <a onClick={handleCreateAccount}>create an account</a> here.
          </p>

          <p className="text-xs">
            In case you have forgotten your password, you can{' '}
            <a onClick={handleRecoverAccount}>recover your account</a> here.
          </p>
        </div>
      </BaseModal>
    </>
  );
};

export default LoginModal;
