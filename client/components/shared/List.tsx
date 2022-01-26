import { get, isEmpty } from 'lodash';

import { useAppSelector } from '@/store/hooks';

import styles from './List.module.scss';

interface Props {
  path: string;
}

const List: React.FC<Props> = ({ path }) => {
  const list: Array<any> = useAppSelector((state) => get(state.resume, path, []));

  if (isEmpty(list)) {
    return <div className={styles.container}>This list is empty.</div>;
  }

  return (
    <div className={styles.container}>
      {list.map((x) => (
        <span key={x}>x</span>
      ))}
    </div>
  );
};

export default List;
