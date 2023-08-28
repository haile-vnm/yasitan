import { io, Socket } from 'socket.io-client';
import Message from './api/models/message';
import { getAppToken } from './services';

let socket: Socket;
/**
 * Avoid create Socket instance on server side, that will be missing some data from client.
 * For example, localStorage object
 */
const getSocketInstance = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      autoConnect: false,
      auth: {
        token: getAppToken(),
      },
    });
  }

  return socket;
};

interface NewMessagesEvent {
  message: Message;
}

export const connect = () => getSocketInstance().connect();

export const disconnect = () => getSocketInstance().disconnect();

export const onNewMessage = (
  newMessageHandler: (data: NewMessagesEvent) => void,
) =>
  getSocketInstance().on('new_message', (data: NewMessagesEvent) => {
    newMessageHandler(data);
  });
