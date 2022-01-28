import {
  ContentCopy,
  DeleteOutline,
  DriveFileRenameOutline,
  Link,
  MoreVert,
  OpenInNew,
} from '@mui/icons-material';
import { ButtonBase, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip } from '@mui/material';
import { Resume } from '@reactive-resume/schema';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';

import { ServerError } from '@/services/axios';
import queryClient from '@/services/react-query';
import {
  deleteResume,
  DeleteResumeParams,
  duplicateResume,
  DuplicateResumeParams,
} from '@/services/resume';
import { useAppDispatch } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';

import styles from './ResumePreview.module.scss';

type Props = {
  resume: Resume;
};

const ResumePreview: React.FC<Props> = ({ resume }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const duplicateMutation = useMutation<Resume, ServerError, DuplicateResumeParams>(
    duplicateResume,
  );

  const deleteMutation = useMutation<void, ServerError, DeleteResumeParams>(deleteResume);

  const handleOpen = () => {
    handleClose();

    router.push(`/${resume.user.username}/${resume.slug}/build`);
  };

  const handleOpenMenu = (event: React.MouseEvent<Element>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRename = () => {
    handleClose();

    dispatch(
      setModalState({ modal: 'dashboard.rename-resume', state: { open: true, payload: resume } }),
    );
  };

  const handleDuplicate = () => {
    handleClose();

    duplicateMutation.mutate(
      { id: resume.id },
      { onSuccess: () => queryClient.invalidateQueries('resumes') },
    );
  };

  const handleShareLink = async () => {
    handleClose();

    const link = `https://rxresu.me/${resume.user.username}/${resume.slug}`;
    await navigator.clipboard.writeText(link);

    toast.success('The public link to your resume has been copied to your clipboard.');
  };

  const handleDelete = () => {
    handleClose();

    deleteMutation.mutate(
      { id: resume.id },
      { onSuccess: () => queryClient.invalidateQueries('resumes') },
    );
  };

  return (
    <section className={styles.resume}>
      <ButtonBase className={styles.preview} onClick={handleOpen}>
        {resume.image ? (
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_GATEWAY + resume.image}
            alt={resume.name}
            objectFit="cover"
            layout="fill"
            priority
          />
        ) : null}
      </ButtonBase>

      <footer>
        <div className={styles.meta}>
          <p>{resume.name}</p>
          <p>Last updated {dayjs(resume.updatedAt).fromNow()}</p>
        </div>

        <ButtonBase className={styles.menu} onClick={handleOpenMenu}>
          <MoreVert />
        </ButtonBase>

        <Menu anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
          <MenuItem onClick={handleOpen}>
            <ListItemIcon>
              <OpenInNew />
            </ListItemIcon>
            <ListItemText>Open</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleRename}>
            <ListItemIcon>
              <DriveFileRenameOutline />
            </ListItemIcon>
            <ListItemText>Rename</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleDuplicate}>
            <ListItemIcon>
              <ContentCopy />
            </ListItemIcon>
            <ListItemText>Duplicate</ListItemText>
          </MenuItem>

          {resume.public ? (
            <MenuItem onClick={handleShareLink}>
              <ListItemIcon>
                <Link />
              </ListItemIcon>
              <ListItemText>Share Link</ListItemText>
            </MenuItem>
          ) : (
            <Tooltip
              arrow
              placement="right"
              title="You need to change the visibility of your resume to public to be able to share a link."
            >
              <div>
                <MenuItem disabled>
                  <ListItemIcon>
                    <Link />
                  </ListItemIcon>
                  <ListItemText>Share Link</ListItemText>
                </MenuItem>
              </div>
            </Tooltip>
          )}
          <Tooltip
            arrow
            placement="right"
            title="Are you sure you want to delete this resume? This is an irreversible action."
          >
            <div>
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <DeleteOutline className="text-red-600 dark:text-red-400" />
                </ListItemIcon>
                <ListItemText className="text-red-600 dark:text-red-400">Delete</ListItemText>
              </MenuItem>
            </div>
          </Tooltip>
        </Menu>
      </footer>
    </section>
  );
};

export default ResumePreview;
