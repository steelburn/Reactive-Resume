import ResumeInput from '../ResumeInput';
import SectionHeader from '../SectionHeader';

const Profile = () => {
  return (
    <div id="profile">
      <SectionHeader name="Profile" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <ResumeInput label="First Name" path="data.profile.firstName" />
        <ResumeInput label="Last Name" path="data.profile.lastName" />
      </div>
    </div>
  );
};

export default Profile;
