import { Add as AddIcon, Close as CloseIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import ReactModal from 'react-modal';

type Props = {
  isOpen: boolean;
  heading: string;
  handleClose: () => void;
  footerChildren?: React.ReactNode;
};

const BaseModal: React.FC<Props> = ({ isOpen, heading, children, handleClose, footerChildren }) => {
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
        <div>
          <AddIcon />
          <h1>{heading}</h1>
        </div>

        <IconButton size="small" onClick={handleClose}>
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </header>
      {children}

      {footerChildren ? <footer className="ReactModal__Footer">{footerChildren}</footer> : null}
    </ReactModal>
  );
};

export default BaseModal;
