import clsx from 'clsx';
import { isEmpty } from 'lodash';

import { useAppSelector } from '@/store/hooks';
import styles from '@/styles/components/build/Artboard.module.scss';

const Artboard = () => {
  const resume = useAppSelector((state) => state.resume);

  if (isEmpty(resume)) return null;

  const { data } = resume;
  const { profile } = data;

  return (
    <div className={clsx('reset', styles.artboard)}>
      <p>First Name: {profile.firstName}</p>
      <p>Last Name: {profile.lastName}</p>
    </div>
  );
};

export default Artboard;
