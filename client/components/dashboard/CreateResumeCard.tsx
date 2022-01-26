import { Add as AddIcon } from '@mui/icons-material';
import { ButtonBase } from '@mui/material';

import { useAppDispatch } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

import styles from './CreateResume.module.scss';

const CreateResume = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setModalState({ modal: 'dashboard.create-resume', state: { open: true } }));
  };

  return (
    <section className={styles.resume}>
      <ButtonBase className={styles.preview} onClick={handleClick}>
        <AddIcon sx={{ fontSize: 64 }} />
      </ButtonBase>

      <footer>
        <div className={styles.meta}>
          <p>Create New Resume</p>
          <p>Start from scratch</p>
        </div>
      </footer>
    </section>
  );
};

export default CreateResume;
