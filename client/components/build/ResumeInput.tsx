import clsx from 'clsx';
import { debounce, get } from 'lodash';
import React, { useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResumeState } from '@/store/resume/resumeSlice';

const DEBOUNCE_WAIT = 250;

interface Props {
  type?: 'text' | 'file';
  label: string;
  path: string;
  className?: string;
}

const ResumeInput: React.FC<Props> = ({ type = 'text', label, path, className }) => {
  const dispatch = useAppDispatch();

  const stateValue = useAppSelector((state) => get(state.resume, path, ''));

  const [value, setValue] = useState(stateValue);

  const handleStateUpdate = useMemo(
    () =>
      debounce(
        (path: string, value: string) => dispatch(setResumeState({ path, value })),
        DEBOUNCE_WAIT,
      ),
    [dispatch],
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    handleStateUpdate(path, event.target.value);
  };

  if (type === 'file') {
    return (
      <div className={clsx('grid gap-4 grid-cols-5', className)}>
        <label className="col-span-4 form-control">
          <span>{label}</span>
          <input type="text" value={value} onChange={onChange} />
        </label>
      </div>
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
