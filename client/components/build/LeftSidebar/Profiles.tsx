import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';

import Header from '@/components/shared/Header';
import List from '@/components/shared/List';

const Profiles = () => {
  return (
    <section id="profiles">
      <Header name="Profiles" />

      <List path="basics.profiles" />

      <footer className="flex justify-end">
        <Button variant="outlined" startIcon={<Add />}>
          Add New Profile
        </Button>
      </footer>
    </section>
  );
};

export default Profiles;
