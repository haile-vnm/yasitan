import { AxiosError } from 'axios';
import { apiService } from '../services';
import Conversation from './models/conversation';
import Message from './models/message';

export const getConversations = () =>
  apiService
    .get<{ conversations: Conversation[] }>(['conversations'])
    .then(res => res.conversations)
    .catch((err: AxiosError) => Promise.reject(err.response?.data));

export const getConvoMessages = (convoId: string) =>
  apiService
    .get<{ messages: Message[] }>(['conversations', convoId, 'messages'])
    .then(res => res.messages)
    .catch((err: AxiosError) => Promise.reject(err.response?.data));
