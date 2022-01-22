import { throttle } from 'lodash';
import { useEffect, useState } from 'react';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const getDeviceConfig = (width: number): Breakpoint => {
  if (width >= 1536) {
    return '2xl';
  } else if (width >= 1280) {
    return 'xl';
  } else if (width >= 1024) {
    return 'lg';
  } else if (width >= 768) {
    return 'md';
  } else if (width >= 640) {
    return 'sm';
  } else {
    return 'xs';
  }
};

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const innerWidth = throttle(() => {
        setBreakpoint(getDeviceConfig(window.innerWidth));
      }, 1000);

      window.addEventListener('resize', innerWidth);

      return () => window.removeEventListener('resize', innerWidth);
    }
  }, []);

  return breakpoint;
};

export default useBreakpoint;
