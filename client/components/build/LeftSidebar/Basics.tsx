import ResumeInput from '../ResumeInput';
import SectionHeader from '../SectionHeader';

const Basics = () => {
  return (
    <div id="basics">
      <SectionHeader name="Basics" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResumeInput label="Name" path="basics.name" className="col-span-2" />
        <ResumeInput type="file" label="Image" path="basics.image" className="col-span-2" />
      </div>
    </div>
  );
};

export default Basics;
