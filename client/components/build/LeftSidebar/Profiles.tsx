import { Add } from '@mui/icons-material';

import Button from '@/components/shared/Button';
import Header from '@/components/shared/Header';
import List from '@/components/shared/List';

const Profiles = () => {
  return (
    <section id="profiles">
      <Header name="Profiles" />

      <List path="basics.profiles" />

      <footer className="flex justify-end">
        <Button variant="outline" icon={<Add />}>
          Add New Profile
        </Button>
      </footer>
    </section>
  );
};

export default Profiles;
