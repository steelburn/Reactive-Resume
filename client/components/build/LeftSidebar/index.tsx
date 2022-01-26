import { Person as PersonIcon } from '@mui/icons-material';
import { Divider, IconButton, SwipeableDrawer, Tooltip, useMediaQuery } from '@mui/material';

import Logo from '@/components/shared/Logo';
import theme from '@/config/theme';
import { setSidebarState } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import Basics from './Basics';
import styles from './LeftSidebar.module.scss';
import Location from './Location';
import Profiles from './Profiles';

const LeftSidebar = () => {
  const dispatch = useAppDispatch();

  const { open } = useAppSelector((state) => state.build.leftSidebar);

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const handleOpen = () => {
    dispatch(setSidebarState({ sidebar: 'left', state: { open: true } }));
  };

  const handleClose = () => {
    dispatch(setSidebarState({ sidebar: 'left', state: { open: false } }));
  };

  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      variant={isDesktop ? 'persistent' : 'temporary'}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      <div className={styles.container}>
        <nav>
          <div>
            <Logo size={40} url="/dashboard" />
            <Divider />
          </div>

          <div className={styles.sections}>
            <Tooltip title="Profile" placement="right" arrow>
              <IconButton size="small">
                <PersonIcon />
              </IconButton>
            </Tooltip>
          </div>

          <div></div>
        </nav>

        <main>
          <Basics />
          <Location />
          <Profiles />
        </main>
      </div>
    </SwipeableDrawer>
  );
};

export default LeftSidebar;
