import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import BaseModal from '@/components/shared/BaseModal';
import { resetPassword, ResetPasswordParams } from '@/services/auth';
import { ServerError } from '@/services/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ModalState, setModalState } from '@/store/modal/modalSlice';

type Payload = {
  resetToken?: string;
};

type FormData = {
  password: string;
  confirmPassword: string;
};

const schema = Joi.object({
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).required().valid(Joi.ref('password')),
});

const ResetPasswordModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { open: isOpen, payload } = useAppSelector(
    (state) => state.modal['auth.reset'],
  ) as ModalState<Payload>;

  const { mutate, isLoading } = useMutation<void, ServerError, ResetPasswordParams>(resetPassword);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: joiResolver(schema) });

  const handleClose = () => {
    reset();
    dispatch(setModalState({ modal: 'auth.reset', state: { open: false } }));
  };

  const onSubmit = ({ password }: FormData) => {
    if (!payload?.resetToken) return;

    mutate({ resetToken: payload?.resetToken, password }, { onSuccess: () => handleClose() });
  };

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        heading="Reset your password"
        handleClose={handleClose}
        footerChildren={
          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Set New Password
          </button>
        }
      >
        <div className="grid gap-4">
          <p>Just enter the email address associated with the account you would like to recover.</p>

          <form className="grid gap-4 md:grid-cols-2">
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
            If the account exists, you will receive an email with a link to reset your password.
          </p>
        </div>
      </BaseModal>
    </>
  );
};

export default ResetPasswordModal;
