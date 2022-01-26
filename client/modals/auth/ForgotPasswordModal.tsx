import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import BaseModal from '@/components/shared/BaseModal';
import { forgotPassword, ForgotPasswordParams } from '@/services/auth';
import { ServerError } from '@/services/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

type FormData = {
  email: string;
};

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
});

const ForgotPasswordModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { open: isOpen } = useAppSelector((state) => state.modal['auth.forgot']);

  const { mutate, isLoading } = useMutation<void, ServerError, ForgotPasswordParams>(
    forgotPassword,
  );

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: joiResolver(schema) });

  const handleClose = () => {
    reset();
    dispatch(setModalState({ modal: 'auth.forgot', state: { open: false } }));
  };

  const onSubmit = ({ email }: FormData) => {
    mutate({ email }, { onSettled: () => handleClose() });
  };

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        heading="Forgot your password?"
        handleClose={handleClose}
        footerChildren={
          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Send Reset Password Email
          </button>
        }
      >
        <div className="grid gap-4">
          <p>Just enter the email address associated with the account you would like to recover.</p>

          <form className="grid gap-4 xl:w-2/3">
            <label className="form-control">
              <span>Email Address</span>
              <input type="email" {...register('email', { required: true })} />
              {errors.email ? <span className="error">{errors.email.message}</span> : null}
            </label>
          </form>

          <p className="text-xs">
            If the account exists, you will receive an email with a link to reset your password.
          </p>
        </div>
      </BaseModal>
    </>
  );
};

export default ForgotPasswordModal;
