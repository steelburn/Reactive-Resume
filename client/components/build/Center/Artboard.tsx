import clsx from 'clsx';
import { isEmpty } from 'lodash';

import { useAppSelector } from '@/store/hooks';

import styles from './Artboard.module.scss';

const Artboard = () => {
  const resume = useAppSelector((state) => state.resume);

  if (isEmpty(resume)) return null;

  return (
    <div className={clsx('reset', styles.artboard)}>
      <p>Name: {resume.basics?.name}</p>
    </div>
  );
};

export default Artboard;
