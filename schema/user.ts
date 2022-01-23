import { Resume } from './resume';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  resetToken?: string;
  resumes: Resume[];
  createdAt: Date;
  updatedAt: Date;
};
