import { Resume } from '@reactive-resume/schema';
import { debounce, isEmpty } from 'lodash';
import { createContext, useEffect, useMemo, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import { useAppSelector } from '@/store/hooks';

const DEBOUNCE_WAIT = 5000;

const SocketContext = createContext<Socket | null>(null);

const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const resume = useAppSelector((state) => state.resume);

  const debouncedUpdateResume = useMemo(
    () =>
      debounce((resume: Partial<Resume>) => {
        if (socket) {
          socket.emit('update-resume', resume);
        }
      }, DEBOUNCE_WAIT),
    [socket],
  );

  useEffect(() => {
    if (!isEmpty(resume)) {
      debouncedUpdateResume(resume);
    }
  }, [debouncedUpdateResume, resume]);

  useEffect(() => {
    if (accessToken && !socket) {
      setSocket(
        io(process.env.NEXT_PUBLIC_SERVER_GATEWAY, {
          extraHeaders: { Authorization: accessToken },
        }),
      );
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket, accessToken]);

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export { SocketContext, SocketProvider };
