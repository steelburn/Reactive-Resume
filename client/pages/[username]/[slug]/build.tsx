import { useMediaQuery } from '@mui/material';
import { Resume } from '@reactive-resume/schema';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect } from 'react';
import { useQuery } from 'react-query';

import Center from '@/components/build/Center';
import LeftSidebar from '@/components/build/LeftSidebar';
import RightSidebar from '@/components/build/RightSidebar';
import theme from '@/config/theme';
import { fetchResumeByIdentifier } from '@/services/resume';
import { setSidebarState } from '@/store/build/buildSlice';
import { useAppDispatch } from '@/store/hooks';
import { setResume } from '@/store/resume/resumeSlice';
import styles from '@/styles/pages/Build.module.scss';

type QueryParams = {
  username: string;
  slug: string;
};

type Props = {
  username: string;
  resume?: Resume;
  slug: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const { username, slug } = query as QueryParams;

  try {
    const resume = await fetchResumeByIdentifier({ username, slug });

    return { props: { username, slug, resume } };
  } catch {
    return { props: { username, slug } };
  }
};

const Build: NextPage<Props> = ({ username, slug, resume }) => {
  const dispatch = useAppDispatch();

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const { data } = useQuery<Resume>(
    `resume/${username}/${slug}`,
    () => fetchResumeByIdentifier({ username, slug }),
    {
      initialData: resume,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => dispatch(setResume(data)),
    },
  );

  useEffect(() => {
    if (data) dispatch(setResume(data));
  }, [data, dispatch]);

  useEffect(() => {
    if (isDesktop) {
      dispatch(setSidebarState({ sidebar: 'left', state: { open: true } }));
      dispatch(setSidebarState({ sidebar: 'right', state: { open: true } }));
    } else {
      dispatch(setSidebarState({ sidebar: 'left', state: { open: false } }));
      dispatch(setSidebarState({ sidebar: 'right', state: { open: false } }));
    }
  }, [isDesktop, dispatch]);

  if (!data) return null;

  return (
    <div className={styles.container}>
      <LeftSidebar />
      <Center />
      <RightSidebar />
    </div>
  );
};

export default Build;
