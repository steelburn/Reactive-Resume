import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Modal from 'react-modal';

import { useAppDispatch } from '@/store/hooks';
import { ModalName, setModalState } from '@/store/modal/modalSlice';

import ForgotPasswordModal from './auth/ForgotPasswordModal';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import ResetPasswordModal from './auth/ResetPasswordModal';
import CreateResumeModal from './dashboard/CreateResumeModal';
import RenameResumeModal from './dashboard/RenameResumeModal';

type QueryParams = {
  modal?: ModalName;
};

const ModalWrapper: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);

  useEffect(() => {
    const { modal, ...rest } = router.query as QueryParams;

    if (!modal) return;

    dispatch(setModalState({ modal, state: { open: true, payload: rest } }));
  }, [router.query, dispatch]);

  return (
    <>
      {/* Authentication */}
      <LoginModal />
      <RegisterModal />
      <ForgotPasswordModal />
      <ResetPasswordModal />

      {/* Dashboard */}
      <CreateResumeModal />
      <RenameResumeModal />
    </>
  );
};

export default ModalWrapper;
