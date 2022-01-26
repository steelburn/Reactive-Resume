import { ButtonBase } from '@mui/material';
import clsx from 'clsx';

import styles from './Button.module.scss';

interface Props {
  icon?: React.ReactNode;
  variant?: 'default' | 'outline';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<Props> = ({ variant = 'default', onClick, icon, children }) => {
  return (
    <ButtonBase>
      <button
        onClick={onClick}
        className={clsx(styles.button, {
          [styles.outline]: variant === 'outline',
        })}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </button>
    </ButtonBase>
  );
};

export default Button;
