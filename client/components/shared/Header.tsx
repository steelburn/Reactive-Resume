import { Visibility } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { isFunction } from 'lodash';

import styles from './Header.module.scss';

type Props = {
  name: string;
  toggleVisibility?: () => void;
};

const Header: React.FC<Props> = ({ name, toggleVisibility }) => {
  return (
    <div className={styles.container}>
      <h1>{name}</h1>

      {isFunction(toggleVisibility) && (
        <IconButton onClick={toggleVisibility}>
          <Visibility />
        </IconButton>
      )}
    </div>
  );
};

export default Header;
