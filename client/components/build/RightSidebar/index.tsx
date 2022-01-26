import { Divider, SwipeableDrawer, useMediaQuery } from '@mui/material';

import Avatar from '@/components/shared/Avatar';
import theme from '@/config/theme';
import { setSidebarState } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import styles from './RightSidebar.module.scss';

const RightSidebar = () => {
  const dispatch = useAppDispatch();

  const { open } = useAppSelector((state) => state.build.rightSidebar);

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const handleOpen = () => {
    dispatch(setSidebarState({ sidebar: 'right', state: { open: true } }));
  };

  const handleClose = () => {
    dispatch(setSidebarState({ sidebar: 'right', state: { open: false } }));
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      variant={isDesktop ? 'persistent' : 'temporary'}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      <div className={styles.container}>
        <nav>
          <div>
            <Avatar size={40} />
            <Divider />
          </div>

          <div className={styles.sections}></div>

          <div></div>
        </nav>
      </div>
    </SwipeableDrawer>
  );
};

export default RightSidebar;
