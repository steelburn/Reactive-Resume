import type { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';

import CreateResumeCard from '@/components/dashboard/CreateResumeCard';
import ResumeCard from '@/components/dashboard/ResumePreview';
import Avatar from '@/components/shared/Avatar';
import Logo from '@/components/shared/Logo';
import { fetchResumes } from '@/services/resume';
import styles from '@/styles/pages/Dashboard.module.scss';

const Dashboard: NextPage = () => {
  const { data } = useQuery('resumes', fetchResumes);

  if (!data) return null;

  return (
    <div className={styles.container}>
      <Head>
        <title>Dashboard | Reactive Resume</title>
      </Head>

      <header>
        <Logo size={48} />
        <Avatar size={40} />
      </header>

      <main className={styles.resumes}>
        <CreateResumeCard />
        {data.map((resume) => (
          <ResumeCard key={resume.id} resume={resume} />
        ))}
      </main>
    </div>
  );
};

export default Dashboard;
