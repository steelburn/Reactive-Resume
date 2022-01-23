import { Resume } from '@reactive-resume/schema';
import { AxiosResponse } from 'axios';

import axios from './axios';

export type CreateResumeParams = {
  name: string;
  slug: string;
  public: boolean;
};

export type FetchResumeByIdentifierParams = {
  username: string;
  slug: string;
};

export type RenameResumeParams = {
  id: number;
  name: string;
  slug: string;
};

export type DuplicateResumeParams = {
  id: number;
};

export type DeleteResumeParams = {
  id: number;
};

export const fetchResumes = () => axios.get<Resume[]>('/resume').then((res) => res.data);

export const fetchResumeByIdentifier = ({ username, slug }: FetchResumeByIdentifierParams) =>
  axios.get<Resume>(`/resume/${username}/${slug}`).then((res) => res.data);

export const createResume = (createResumeParams: CreateResumeParams) =>
  axios
    .post<Resume, AxiosResponse<Resume>, CreateResumeParams>('/resume', createResumeParams)
    .then((res) => res.data);

export const renameResume = (renameResumeParams: RenameResumeParams) =>
  axios
    .patch<Resume, AxiosResponse<Resume>, RenameResumeParams>(
      `/resume/${renameResumeParams.id}`,
      renameResumeParams,
    )
    .then((res) => res.data);

export const updateResume = (updateResumeParams: Partial<Resume>) =>
  axios
    .patch<Resume, AxiosResponse<Resume>, Partial<Resume>>(
      `/resume/${updateResumeParams.id}`,
      updateResumeParams,
    )
    .then((res) => res.data);

export const duplicateResume = (duplicateResumeParams: DuplicateResumeParams) =>
  axios
    .post<Resume, AxiosResponse<Resume>, DuplicateResumeParams>(
      `/resume/duplicate/${duplicateResumeParams.id}`,
    )
    .then((res) => res.data);

export const deleteResume = (deleteResumeParams: DeleteResumeParams) =>
  axios
    .delete<void, AxiosResponse<void>, DeleteResumeParams>(`/resume/${deleteResumeParams.id}`)
    .then((res) => res.data);
