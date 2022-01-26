import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import clsx from 'clsx';
import { useRouter } from 'next/router';

import theme from '@/config/theme';
import { setSidebarState } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import styles from './Header.module.scss';

const Header = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const resume = useAppSelector((state) => state.resume);
  const { open: leftSidebarOpen } = useAppSelector((state) => state.build.leftSidebar);
  const { open: rightSidebarOpen } = useAppSelector((state) => state.build.rightSidebar);

  const toggleLeftSidebar = () => {
    dispatch(setSidebarState({ sidebar: 'left', state: { open: !leftSidebarOpen } }));
  };

  const toggleRightSidebar = () => {
    dispatch(setSidebarState({ sidebar: 'right', state: { open: !rightSidebarOpen } }));
  };

  return (
    <AppBar elevation={0} position="fixed">
      <Toolbar
        variant={isDesktop ? 'regular' : 'dense'}
        className={clsx(styles.header, {
          [styles.pushLeft]: leftSidebarOpen,
          [styles.pushRight]: rightSidebarOpen,
        })}
      >
        <IconButton onClick={toggleLeftSidebar}>
          {leftSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>

        <div className={styles.title}>
          <IconButton
            className="opacity-50 hover:opacity-100"
            onClick={() => router.push('/dashboard')}
          >
            <HomeIcon />
          </IconButton>
          <span className="opacity-50">{'/'}</span>
          <h1>{resume.name}</h1>
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
        </div>

        <IconButton onClick={toggleRightSidebar}>
          {rightSidebarOpen ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
