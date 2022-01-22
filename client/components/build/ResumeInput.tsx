import clsx from 'clsx';
import { debounce, get } from 'lodash';
import React, { HTMLInputTypeAttribute, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setResumeState } from '@/store/resume/resumeSlice';

interface Props {
  type?: HTMLInputTypeAttribute;
  label: string;
  path: string;
  className?: string;
}

const ResumeInput: React.FC<Props> = ({ type = 'text', label, path, className }) => {
  const dispatch = useAppDispatch();

  const stateValue = useAppSelector((state) => get(state.resume, path, ''));

  const [value, setValue] = useState(stateValue);

  const handleStateUpdate = useMemo(
    () => debounce((path: string, value: string) => dispatch(setResumeState({ path, value })), 250),
    [dispatch]
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    handleStateUpdate(path, event.target.value);
  };

  return (
    <label className={clsx('form-control', className)}>
      <span>{label}</span>
      <input type={type} value={value} onChange={onChange} />
    </label>
  );
};

export default ResumeInput;
