import { Divider } from '@mui/material';

import Header from '@/components/shared/Header';
import ResumeInput from '@/components/shared/ResumeInput';

const Basics = () => {
  return (
    <section id="basics">
      <Header name="Basics" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResumeInput label="Name" path="basics.name" />
        <ResumeInput type="file" label="Image" path="basics.image" />
        <ResumeInput label="Email" path="basics.email" className="col-span-2" />
        <ResumeInput label="Phone" path="basics.phone" />
        <ResumeInput label="Website" path="basics.website" />

        <Divider className="col-span-2 py-2" />

        <ResumeInput label="Headline" path="basics.headline" className="col-span-2" />
        <ResumeInput
          type="textarea"
          label="Summary"
          path="basics.summary"
          className="col-span-2"
          markdownSupported
        />
      </div>
    </section>
  );
};

export default Basics;
