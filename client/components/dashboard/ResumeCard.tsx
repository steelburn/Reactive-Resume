import {
  ContentCopy as ContentCopyIcon,
  DeleteOutline as DeleteOutlineIcon,
  DriveFileRenameOutline as DriveFileRenameOutlineIcon,
  Link as LinkIcon,
  MoreVert as MoreVertIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { ButtonBase, Menu, MenuItem, Tooltip } from '@mui/material';
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
import styles from '@/styles/components/dashboard/ResumeCard.module.scss';

type Props = {
  resume: Resume;
};

const ResumeCard: React.FC<Props> = ({ resume }) => {
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
      <div className={styles.preview} onClick={handleOpen}>
        {resume.image ? (
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_GATEWAY + resume.image}
            alt={resume.name}
            objectFit="cover"
            layout="fill"
            priority
          />
        ) : null}
      </div>

      <footer>
        <div className={styles.meta}>
          <p>{resume.name}</p>
          <p>Last updated {dayjs(resume.updatedAt).fromNow()}</p>
        </div>

        <ButtonBase className={styles.menu} onClick={handleOpenMenu}>
          <MoreVertIcon />
        </ButtonBase>

        <Menu anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
          <MenuItem onClick={handleOpen}>
            <OpenInNewIcon />
            <span className="ml-3">Open</span>
          </MenuItem>
          <MenuItem onClick={handleRename}>
            <DriveFileRenameOutlineIcon />
            <span className="ml-3">Rename</span>
          </MenuItem>
          <MenuItem onClick={handleDuplicate}>
            <ContentCopyIcon />
            <span className="ml-3">Duplicate</span>
          </MenuItem>

          {resume.public ? (
            <MenuItem onClick={handleShareLink}>
              <LinkIcon />
              <span className="ml-3">Share Link</span>
            </MenuItem>
          ) : (
            <Tooltip
              arrow
              placement="right"
              title="You need to change the visibility of your resume to public to be able to share a link."
            >
              <div>
                <MenuItem disabled>
                  <LinkIcon />
                  <span className="ml-3">Share Link</span>
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
                <DeleteOutlineIcon className="text-red-600 dark:text-red-400" />
                <span className="ml-3 text-red-600 dark:text-red-400">Delete</span>
              </MenuItem>
            </div>
          </Tooltip>
        </Menu>
      </footer>
    </section>
  );
};

export default ResumeCard;
