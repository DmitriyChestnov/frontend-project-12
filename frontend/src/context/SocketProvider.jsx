import { useCallback, useMemo } from 'react';

import { SocketContext } from './index';

const SocketProvider = ({ socket, children }) => {
  const disconnectSocket = useCallback(() => {
    socket.disconnect();
  }, [socket]);

  const sendMessage = useCallback(
    async (message) => {
      await socket.timeout(3000).emitWithAck('newMessage', message);
    },
    [socket],
  );

  const asyncronizeSocket = (fn) => (...args) => new Promise((resolve, reject) => {
    setTimeout(() => {
      reject();
    }, 3000);

    fn(...args, (response) => {
      resolve(response.data);
    });
  });

  const addChannel = asyncronizeSocket((...args) => socket.volatile.emit('newChannel', ...args));

  const removeChannel = asyncronizeSocket((...args) => socket.volatile.emit('removeChannel', ...args));

  const renameChannel = asyncronizeSocket((...args) => socket.volatile.emit('renameChannel', ...args));

  const socketContext = useMemo(
    () => ({
      socket,
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
      disconnectSocket,
    }),
    [
      socket,
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
      disconnectSocket,
    ],
  );

  return (
    <SocketContext.Provider value={socketContext}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
