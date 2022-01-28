import { ButtonBase } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

type Props = {
  size?: 256 | 64 | 48 | 40 | 32;
  url?: string;
};

const Logo: React.FC<Props> = ({ size = 64, url = '/' }) => {
  const router = useRouter();

  const gotoURL = () => router.push(url);

  return (
    <ButtonBase onClick={gotoURL}>
      <Image
        alt="Reactive Resume"
        src="/images/logo.svg"
        className="rounded"
        width={size}
        height={size}
      />
    </ButtonBase>
  );
};

export default Logo;
