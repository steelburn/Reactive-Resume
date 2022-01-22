import { Visibility } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import styles from '@/styles/components/build/SectionHeader.module.scss';

type Props = {
  name: string;
};

const SectionHeader: React.FC<Props> = ({ name }) => {
  return (
    <div className={styles.container}>
      <h1>{name}</h1>

      <IconButton>
        <Visibility />
      </IconButton>
    </div>
  );
};

export default SectionHeader;
