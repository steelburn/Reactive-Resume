import type { NextPage } from 'next';
import Link from 'next/link';

import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import NoSSR from '@/components/NoSSR';
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
        <div className="w-64 h-64">
          <Logo size={256} />
        </div>

        <div className="grid md:flex-1 md:justify-start">
          <h1 className="text-4xl font-bold">Reactive Resume</h1>

          <h2 className="opacity-50">A free and open source resume builder.</h2>

          <NoSSR>
            <div className={styles['button-wrapper']}>
              {isLoggedIn ? (
                <>
                  <Link passHref href="/dashboard">
                    <button className="btn">Go to App</button>
                  </Link>

                  <button className="btn btn-outline" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button className="btn" onClick={handleLogin}>
                    Login
                  </button>

                  <button className="btn btn-outline" onClick={handleRegister}>
                    Register
                  </button>
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
