import { Location, Name, Profile } from './atoms';

export type Basics = {
  name?: Name;
  image?: string;
  email?: string;
  phone?: string;
  website?: string;
  headline?: string;
  summary?: string;
  location?: Location;
  profiles?: Profile[];
};
