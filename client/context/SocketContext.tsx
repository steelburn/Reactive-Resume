import { createContext, useContext, useEffect, useMemo } from 'react';

import isBrowser from '@/utils/isBrowser';

const SocketContext = createContext<WebSocket | null>(null);

const SockerProvider: React.FC = ({ children }) => {
  const socket = useMemo(
    () => (isBrowser ? new WebSocket(process.env.NEXT_PUBLIC_WS_GATEWAY) : null),
    []
  );

  useEffect(() => {
    return () => socket?.close();
  }, [socket]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

const useSocket = (): WebSocket => {
  const context = useContext(SocketContext);

  if (context === null) {
    throw new Error('useSocket must be used inside a SocketProvider');
  }

  return context;
};

export { SockerProvider, SocketContext, useSocket };
