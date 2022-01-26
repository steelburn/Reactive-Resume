import { IconButton } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = {
  size?: 256 | 64 | 48 | 40 | 32;
  url?: string;
};

const Logo: React.FC<Props> = ({ size = 64, url = '/' }) => {
  const router = useRouter();

  const goHome = () => {
    router.push(url);
  };

  return (
    <IconButton onClick={goHome}>
      <Image
        alt="Reactive Resume"
        src="/images/logo.svg"
        className="rounded cursor-pointer"
        width={size}
        height={size}
      />
    </IconButton>
  );
};

export default Logo;
