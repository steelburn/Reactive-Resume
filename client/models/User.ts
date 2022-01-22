import type { Resume } from './Resume';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  resetToken?: string;
  resumes: Resume[];
  createdAt: Date;
  updatedAt: Date;
};
