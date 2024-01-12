import { io, Socket } from 'socket.io-client';
import Message from './api/models/message';
import { getAppToken } from './services';
import Conversation from './api/models/conversation';

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

interface NewConversationEvent {
  conversation: Conversation;
}

export const connect = () => getSocketInstance().connect();

export const disconnect = () => getSocketInstance().disconnect();

export const onNewMessage = (
  newMessageHandler: (data: NewMessagesEvent) => void,
) =>
  getSocketInstance().on('new_message', (data: NewMessagesEvent) => {
    newMessageHandler(data);
  });

export const onNewConversation = (
  newConversationHandler: (data: NewConversationEvent) => void,
) =>
  getSocketInstance().on('new_conversation', (data: NewConversationEvent) => {
    newConversationHandler(data);
  });
