import { createContext, Dispatch, useContext, useReducer } from 'react';
import { Action } from './models';
import Message from '@/integrations/api/models/message';

interface ConversationMessagesState {
  conversationId: string;
  messages: Message[];
}

type ActionType = 'init' | 'add' | 'update';

type InitMessagesAction = Action<
  ActionType,
  {
    conversationId: string;
    messages?: Message[];
  }
>;

type AddMessageAction = Action<ActionType, { message: Partial<Message> }>;

type UpdateMessageAction = Action<
  ActionType,
  {
    id: string;
    message: Partial<Message>;
  }
>;

const ConversationMessagesStateContext =
  createContext<ConversationMessagesState>({
    conversationId: '',
    messages: [],
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
      return {
        ...state,
        messages: state.messages.concat(action.payload!.message as Message),
      };
    }

    case 'update': {
      const { id, message } = (action as UpdateMessageAction).payload!;
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg._id === id ? { ...msg, ...message } : msg,
        ),
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

export const updateMessage = (
  dispatch: Dispatch<UpdateMessageAction>,
  id: string,
  message: Partial<Message>,
) => dispatch({ type: 'update', payload: { id, message } });

export const initMessages = (
  dispatch: Dispatch<InitMessagesAction>,
  conversationId: string,
  messages?: Message[],
) => dispatch({ type: 'init', payload: { messages, conversationId } });
