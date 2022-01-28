import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import ReactModal from 'react-modal';

import handleEnter from '@/utils/handleEnter';

type Props = {
  icon?: React.ReactNode;
  isOpen: boolean;
  heading: string;
  handleClose: () => void;
  handleSubmit?: () => void;
  footerChildren?: React.ReactNode;
};

const BaseModal: React.FC<Props> = ({
  icon,
  isOpen,
  heading,
  children,
  handleClose,
  handleSubmit,
  footerChildren,
}) => {
  const router = useRouter();
  const { pathname } = router;

  const handleAfterClose = () => {
    router.push(pathname, '');
  };

  return (
    <ReactModal
      isOpen={isOpen}
      closeTimeoutMS={200}
      contentLabel={heading}
      onRequestClose={handleClose}
      onAfterClose={handleAfterClose}
      className="ReactModal__Content"
      overlayClassName="ReactModal__Overlay"
    >
      <header className="ReactModal__Header">
        <div className="flex items-center">
          {icon}
          {icon && <span className="mx-1 opacity-25">/</span>}
          <h1>{heading}</h1>
        </div>

        <IconButton size="small" onClick={handleClose}>
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </header>

      <div className="ReactModal__Body" onKeyDown={(e) => handleEnter(e, handleSubmit)}>
        {children}
      </div>

      {footerChildren ? <footer className="ReactModal__Footer">{footerChildren}</footer> : null}
    </ReactModal>
  );
};

export default BaseModal;
