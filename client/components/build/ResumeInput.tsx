import clsx from 'clsx';
import { get } from 'lodash';
import React, { useState } from 'react';

import { uploadImage } from '@/services/resume';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResumeState } from '@/store/resume/resumeSlice';

const FILE_UPLOAD_MAX_SIZE = 1000000; // 1 megabyte in bytes

interface Props {
  type?: 'text' | 'file';
  label: string;
  path: string;
  className?: string;
}

const ResumeInput: React.FC<Props> = ({ type = 'text', label, path, className }) => {
  const dispatch = useAppDispatch();

  const resumeId = useAppSelector((state) => state.resume.id);
  const stateValue = useAppSelector((state) => get(state.resume, path, ''));

  const [value, setValue] = useState<string>(stateValue);
  const [error, setError] = useState<string | null>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(setResumeState({ path, value: event.target.value }));
  };

  const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (file.size > FILE_UPLOAD_MAX_SIZE) {
        setError('Please upload only JPEG/PNGs under 1 MB');
        return;
      }

      await uploadImage({ id: resumeId, file: event.target.files[0] });
    }
  };

  if (type === 'file') {
    return (
      <label className={clsx('form-control file', className)}>
        <span>{label}</span>
        <input type={type} onChange={onFileUpload} accept="image/*" />
        {error && <span className="error">{error}</span>}
      </label>
    );
  }

  return (
    <label className={clsx('form-control', className)}>
      <span>{label}</span>
      <input type={type} value={value} onChange={onChange} />
    </label>
  );
};

export default ResumeInput;
