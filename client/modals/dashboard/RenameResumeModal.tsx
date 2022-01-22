import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import BaseModal from '@/components/BaseModal';
import { Resume } from '@/models/Resume';
import { ServerError } from '@/services/axios';
import queryClient from '@/services/react-query';
import { renameResume, RenameResumeParams } from '@/services/resume';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ModalState, setModalState } from '@/store/modal/modalSlice';

type FormData = {
  name: string;
  slug: string;
};

const schema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string()
    .lowercase()
    .min(3)
    .regex(/^[a-z0-9-]+$/, 'only lowercase characters, numbers and hyphens')
    .required(),
});

const RenameResumeModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { open: isOpen, payload } = useAppSelector(
    (state) => state.modal['dashboard.rename-resume']
  ) as ModalState<Resume>;

  const { mutate, isLoading } = useMutation<Resume, ServerError, RenameResumeParams>(renameResume);

  const {
    reset,
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: payload?.name,
      slug: payload?.slug,
    },
    resolver: joiResolver(schema),
  });
  const name = watch('name');

  useEffect(() => {
    const slug = name
      ? name
          .toLowerCase()
          .replace(/[`~!@#$%^&*()_|+\=?;:'",.<>\{\}\[\]\\\/]/gi, '')
          .replace(/[ ]/gi, '-')
      : '';

    setValue('slug', slug);
  }, [name, setValue]);

  useEffect(() => {
    if (!payload) return;

    const { name, slug }: FormData = payload;

    reset({ name, slug });
  }, [payload, reset]);

  const onSubmit = ({ name, slug }: FormData) => {
    if (!payload) return;

    mutate(
      { id: payload.id, name, slug },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('resumes');
          handleClose();
        },
      }
    );
  };

  const handleClose = () => {
    reset();
    dispatch(setModalState({ modal: 'dashboard.rename-resume', state: { open: false } }));
  };

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        heading="Rename your resume"
        handleClose={handleClose}
        footerChildren={
          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            onClick={handleSubmit(onSubmit)}
          >
            Rename Resume
          </button>
        }
      >
        <div className="grid gap-4">
          <form className="grid gap-4">
            <label className="form-control">
              <span>Name</span>
              <input type="text" {...register('name', { required: true })} />
              {errors.name ? <span className="error">{errors.name.message}</span> : null}
            </label>

            <label className="form-control">
              <span>Slug</span>
              <input type="text" {...register('slug', { required: true })} />
              {errors.slug ? <span className="error">{errors.slug.message}</span> : null}
            </label>
          </form>
        </div>
      </BaseModal>
    </>
  );
};

export default RenameResumeModal;
