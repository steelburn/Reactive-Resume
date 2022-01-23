import { Location, Profile } from './atoms';

export type Basics = {
  name?: string;
  image?: string;
  email?: string;
  phone?: string;
  website?: string;
  headline?: string;
  summary?: string;
  location?: Location;
  profiles?: Profile[];
};
