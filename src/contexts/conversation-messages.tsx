import { createContext, Dispatch, useContext, useReducer } from 'react';
import { Action } from './models';
import Message from '@/integrations/api/models/message';
import Conversation from '@/integrations/api/models/conversation';

const isSameMessage = (message: Partial<Message>, msg: Message) =>
  message._id === msg._id ||
  (!msg._id && msg.metadata?.secondaryId === message.metadata?.secondaryId);
interface ConversationMessagesState {
  conversationId: string;
  messages: Message[];
  conversations: Conversation[];
}

type ActionType =
  | 'init'
  | 'add'
  | 'update'
  | 'setConversations'
  | 'addConversation';

type InitMessagesAction = Action<
  ActionType,
  {
    conversationId: string;
    messages?: Message[];
  }
>;

type AddMessageAction = Action<ActionType, { message: Partial<Message> }>;

type SetConversationsAction = Action<
  ActionType,
  {
    conversations: Conversation[];
  }
>;

type AddConversationAction = Action<
  ActionType,
  {
    conversation: Conversation;
  }
>;

const ConversationMessagesStateContext =
  createContext<ConversationMessagesState>({
    conversationId: '',
    messages: [],
    conversations: [],
  });

const ConversationMessagesDispatchContext = createContext<
  Dispatch<Action<ActionType>> | undefined
>(undefined);

function reducer(
  state: ConversationMessagesState,
  action: Action<ActionType>,
): ConversationMessagesState {
  switch (action.type) {
    case 'init': {
      const { messages, conversationId } = (action as InitMessagesAction)
        .payload!;
      return {
        ...state,
        conversationId,
        messages: messages || state.messages || [],
      };
    }

    case 'add': {
      const { message } = (action as AddMessageAction).payload!;
      const messages: Message[] = [];
      let foundMessage = false;
      state.messages.forEach(msg => {
        if (isSameMessage(message, msg)) {
          foundMessage = true;
          return messages.push({ ...msg, ...message });
        }

        return messages.push(msg);
      });

      if (!foundMessage) {
        messages.push(message as Message);
      }

      return {
        ...state,
        messages,
      };
    }

    case 'setConversations': {
      return {
        ...state,
        conversations: (action as SetConversationsAction).payload
          ?.conversations,
      };
    }

    case 'addConversation': {
      return {
        ...state,
        conversations: [
          (action as AddConversationAction).payload?.conversation,
          ...state.conversations,
        ],
      };
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

interface ConversationMessagesProviderProps {
  children: React.ReactNode;
}

export function ConversationMessagesProvider({
  children,
}: ConversationMessagesProviderProps) {
  const [state, dispatch] = useReducer(reducer, {
    conversationId: '',
    messages: [],
    conversations: [],
  });

  return (
    <ConversationMessagesStateContext.Provider value={state}>
      <ConversationMessagesDispatchContext.Provider value={dispatch}>
        {children}
      </ConversationMessagesDispatchContext.Provider>
    </ConversationMessagesStateContext.Provider>
  );
}

export function useConversationMessagesState() {
  return useContext(ConversationMessagesStateContext);
}

export function useConversationMessagesDispatch() {
  return useContext(ConversationMessagesDispatchContext)!;
}

export const addMessage = (
  dispatch: Dispatch<AddMessageAction>,
  message: Partial<Message>,
) => dispatch({ type: 'add', payload: { message } });

export const initMessages = (
  dispatch: Dispatch<InitMessagesAction>,
  conversationId: string,
  messages?: Message[],
) => dispatch({ type: 'init', payload: { messages, conversationId } });

export const setConversations = (
  dispatch: Dispatch<SetConversationsAction>,
  conversations: Conversation[],
) => dispatch({ type: 'setConversations', payload: { conversations } });

export const addConversation = (
  dispatch: Dispatch<AddConversationAction>,
  conversation: Conversation,
) => dispatch({ type: 'addConversation', payload: { conversation } });
