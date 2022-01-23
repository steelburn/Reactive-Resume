import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';

import BaseModal from '@/components/BaseModal';
import { register as registerUser } from '@/services/auth';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

type FormData = {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const schema = Joi.object({
  name: Joi.string().required(),
  username: Joi.string()
    .lowercase()
    .min(3)
    .regex(/^[a-z0-9-]+$/, 'only lowercase characters, numbers and hyphens')
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required().valid(Joi.ref('password')),
});

const RegisterModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { open: isOpen } = useAppSelector((state) => state.modal['auth.register']);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: joiResolver(schema) });

  const handleClose = () => {
    reset();
    dispatch(setModalState({ modal: 'auth.register', state: { open: false } }));
  };

  const onSubmit = async ({ name, username, email, password }: FormData) => {
    try {
      await registerUser({ name, username, email, password });
      handleClose();
    } catch {
      // pass through
    }
  };

  const handleLogin = () => {
    handleClose();
    dispatch(setModalState({ modal: 'auth.login', state: { open: true } }));
  };

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        handleClose={handleClose}
        heading="Create an account"
        footerChildren={
          <button className="btn" type="submit" onClick={handleSubmit(onSubmit)}>
            Register
          </button>
        }
      >
        <div className="grid gap-4">
          <p>Please enter your personal information to create an account on Reactive Resume.</p>

          <form className="grid gap-4 md:grid-cols-2">
            <label className="form-control">
              <span>Full Name</span>
              <input type="text" {...register('name', { required: true })} />
              {errors.name ? <span className="error">{errors.name.message}</span> : null}
            </label>

            <label className="form-control">
              <span>Username</span>
              <input type="text" {...register('username', { required: true })} />
              {errors.username ? <span className="error">{errors.username.message}</span> : null}
            </label>

            <label className="form-control">
              <span>Email Address</span>
              <input type="email" {...register('email', { required: true })} />
              {errors.email ? <span className="error">{errors.email.message}</span> : null}
            </label>

            <label className="form-control">
              <span>Password</span>
              <input type="password" {...register('password', { required: true })} />
              {errors.password ? <span className="error">{errors.password.message}</span> : null}
            </label>

            <label className="form-control">
              <span>Confirm Password</span>
              <input type="password" {...register('confirmPassword', { required: true })} />
              {errors.confirmPassword ? (
                <span className="error">{errors.confirmPassword.message}</span>
              ) : null}
            </label>
          </form>

          <p className="text-xs">
            If you already have an account, you can <a onClick={handleLogin}>login here</a>.
          </p>
        </div>
      </BaseModal>
    </>
  );
};

export default RegisterModal;
