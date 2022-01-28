import { joiResolver } from '@hookform/resolvers/joi';
import { Add } from '@mui/icons-material';
import { Button, FormControlLabel, FormGroup, Switch } from '@mui/material';
import { Resume } from '@reactive-resume/schema';
import Joi from 'joi';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

import BaseModal from '@/components/shared/BaseModal';
import { ServerError } from '@/services/axios';
import queryClient from '@/services/react-query';
import { createResume, CreateResumeParams } from '@/services/resume';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

type FormData = {
  name: string;
  slug: string;
  isPublic: boolean;
};

const schema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string()
    .lowercase()
    .min(3)
    .regex(/^[a-z0-9-]+$/, 'only lowercase characters, numbers and hyphens')
    .required(),
  isPublic: Joi.boolean().required(),
});

const CreateResumeModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { open: isOpen } = useAppSelector((state) => state.modal['dashboard.create-resume']);

  const { mutate, isLoading } = useMutation<Resume, ServerError, CreateResumeParams>(createResume);

  const {
    reset,
    watch,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: joiResolver(schema) });
  const name = watch('name');

  useEffect(() => {
    const slug = name
      ? name
          .toLowerCase()
          .replace(/[`~!@#$%^&*()_|+=?;:'",.<>{}[]\\\/]/gi, '')
          .replace(/[ ]/gi, '-')
      : '';

    setValue('slug', slug);
  }, [name, setValue]);

  const onSubmit = ({ name, slug, isPublic }: FormData) => {
    mutate(
      { name, slug, public: isPublic },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('resumes');
          handleClose();
        },
      },
    );
  };

  const handleClose = () => {
    reset();
    dispatch(setModalState({ modal: 'dashboard.create-resume', state: { open: false } }));
  };

  return (
    <BaseModal
      isOpen={isOpen}
      icon={<Add />}
      heading="Create a new resume"
      handleClose={handleClose}
      handleSubmit={handleSubmit(onSubmit)}
      footerChildren={
        <Button type="submit" disabled={isLoading} onClick={handleSubmit(onSubmit)}>
          Create Resume
        </Button>
      }
    >
      <p>
        Start building your resume by giving it a name. It could be in reference to the role you are
        applying for, or just your favorite snack.
      </p>

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

        <FormGroup>
          <FormControlLabel
            control={
              <Controller
                name="isPublic"
                control={control}
                defaultValue={true}
                render={({ field }) => <Switch defaultChecked color="secondary" {...field} />}
              />
            }
            label="Is Publicly Accessible?"
          />
        </FormGroup>
      </form>
    </BaseModal>
  );
};

export default CreateResumeModal;
