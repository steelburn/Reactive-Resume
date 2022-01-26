import Header from '@/components/shared/Header';
import ResumeInput from '@/components/shared/ResumeInput';

const Location = () => {
  return (
    <section id="location">
      <Header name="Location" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResumeInput label="Address" path="basics.location.address" className="col-span-2" />
        <ResumeInput label="City" path="basics.location.city" />
        <ResumeInput label="Region" path="basics.location.region" />
        <ResumeInput label="Country" path="basics.location.country" />
        <ResumeInput label="Postal Code" path="basics.location.postalCode" />
      </div>
    </section>
  );
};

export default Location;
