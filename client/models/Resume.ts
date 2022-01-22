import type { User } from './User';

export type Profile = {
  firstName: string;
  lastName: string;
};

export type DataProperties = {
  profile: Profile;
};

export type MetadataProperties = {
  template: string;
};

export type Resume = {
  id: number;
  name: string;
  slug: string;
  image: string;
  user: User;
  data: DataProperties;
  metadata: MetadataProperties;
  public: boolean;
  createdAt: Date;
  updatedAt: Date;
};
