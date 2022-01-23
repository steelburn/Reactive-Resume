import { Basics } from './basics';
import { Metadata } from './metadata';
import { User } from './user';

export type Resume = {
  id: number;
  name: string;
  slug: string;
  image: string;
  user: User;
  basics: Basics;
  metadata: Metadata;
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
};
