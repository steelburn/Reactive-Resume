import { Link, Period } from './atoms.interface';

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  summary: string;
  link: Link;
  period: Period;
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  gpa: string;
  institution: string;
  summary: string;
  period: Period;
}

export interface SectionItem {
  id: string;
  name: string;
  summary: string;
  link: Link;
}

export interface Section {
  id: string;
  name: string;
  visible: boolean;
  items: WorkExperience[] | Education[] | SectionItem[];
}
