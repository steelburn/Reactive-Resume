import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { logout } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from '@/styles/components/Avatar.module.scss';
import getGravatarUrl from '@/utils/getGravatarUrl';

type Props = {
  size?: number;
};

const Avatar: React.FC<Props> = ({ size = 64 }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const user = useAppSelector((state) => state.auth.user);
  const email = user?.email || '';

  const handleOpen = (event: React.MouseEvent<Element>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();

    router.push('/');
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Image
          width={size}
          height={size}
          alt={user?.firstName}
          className={styles.avatar}
          src={getGravatarUrl(email, size)}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem>
          <div>
            <span className="text-xs opacity-50">You are logged in as</span>
            <p>
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default Avatar;
