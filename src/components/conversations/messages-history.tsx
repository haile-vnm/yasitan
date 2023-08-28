import {
  addMessage,
  useConversationMessagesDispatch,
  useConversationMessagesState,
} from '@/contexts/conversation-messages';
import { onNewMessage } from '@/integrations/socket';
import { useEffect } from 'react';

export default function MessagesHistory() {
  const { messages, conversationId } = useConversationMessagesState();
  const messageDispatch = useConversationMessagesDispatch();
  useEffect(() => {
    onNewMessage(({ message }) => {
      if (conversationId !== message.convoId) {
        return;
      }

      addMessage(messageDispatch, message);
    });
  }, []);

  return (
    <div className="h-full flex">
      <div className="p-6 pb-0 w-full self-end mt-auto">
        {messages.map(msg => (
          <div
            className={`p-4 m-3 rounded max-w-[80%] w-fit bg-gray-700 ${
              msg.ownerId ? 'ml-auto text-end' : ''
            }`}
            key={msg._id}
          >
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
}
