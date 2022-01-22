import { Resume } from '@/models/Resume';

const defaultResumeState: Partial<Resume> = {
  name: '',
  slug: '',
  image: '',
  public: true,
  data: {
    profile: {
      firstName: '',
      lastName: '',
    },
  },
  metadata: {
    template: 'Onyx',
  },
};

export default defaultResumeState;
