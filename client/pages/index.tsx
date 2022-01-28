import { Button } from '@mui/material';
import type { NextPage } from 'next';
import Link from 'next/link';

import Footer from '@/components/shared/Footer';
import Logo from '@/components/shared/Logo';
import NoSSR from '@/components/shared/NoSSR';
import { logout } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import styles from '@/styles/pages/Home.module.scss';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const handleLogin = () => dispatch(setModalState({ modal: 'auth.login', state: { open: true } }));

  const handleRegister = () =>
    dispatch(setModalState({ modal: 'auth.register', state: { open: true } }));

  const handleLogout = () => dispatch(logout());

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Logo size={256} />
        </div>

        <div className={styles.main}>
          <h1>Reactive Resume</h1>

          <h2>A free and open source resume builder.</h2>

          <NoSSR>
            <div className={styles['button-wrapper']}>
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" passHref>
                    <Button>Go To App</Button>
                  </Link>

                  <Button variant="outlined" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleLogin}>Login</Button>

                  <Button variant="outlined" onClick={handleRegister}>
                    Register
                  </Button>
                </>
              )}
            </div>
          </NoSSR>
        </div>
      </div>

      <section className={styles.section}>
        <h6>Summary</h6>

        <p>
          Reactive Resume is a free and open source resume builder that&apos;s built to make the
          mundane tasks of creating, updating and sharing your resume as easy as 1, 2, 3. With this
          app, you can create multiple resumes, share them with recruiters or friends through a
          unique link and print it as a PDF, all for free, no ads, no tracking, without losing the
          integrity and privacy of your data.
        </p>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
