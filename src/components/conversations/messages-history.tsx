import { useConversationMessagesState } from '@/contexts/conversation-messages';

export default function MessagesHistory() {
  const { messages } = useConversationMessagesState();
  return (
    <div>
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
  );
}
