import clsx from 'clsx';
import { get } from 'lodash';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { uploadImage } from '@/services/resume';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResumeState } from '@/store/resume/resumeSlice';

const FILE_UPLOAD_MAX_SIZE = 1000000; // 1 megabyte in bytes

interface Props {
  type?: 'text' | 'textarea' | 'file';
  label: string;
  path: string;
  className?: string;
  markdownSupported?: boolean;
}

const ResumeInput: React.FC<Props> = ({
  type = 'text',
  label,
  path,
  className,
  markdownSupported = false,
}) => {
  const dispatch = useAppDispatch();

  const resumeId = useAppSelector((state) => state.resume.id);
  const stateValue = useAppSelector((state) => get(state.resume, path, ''));

  const [value, setValue] = useState<string>(stateValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value);
    dispatch(setResumeState({ path, value: event.target.value }));
  };

  const onFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (file.size > FILE_UPLOAD_MAX_SIZE) {
        toast.error('Please upload only images under 1 MB, preferrably square-cropped.');
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
      </label>
    );
  }

  if (type === 'textarea') {
    return (
      <label className={clsx('form-control', className)}>
        <span>{label}</span>
        <textarea value={value} onChange={onChange} rows={5} />
        {markdownSupported && (
          <span className="pt-2 text-xs opacity-50">
            This section supports{' '}
            <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noreferrer">
              markdown
            </a>{' '}
            formatting.
          </span>
        )}
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
