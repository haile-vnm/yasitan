import { useConversationMessagesState } from '@/contexts/conversation-messages';

export default function MessagesHistory() {
  const { messages } = useConversationMessagesState();
  return <div>{messages.map(msg => msg.content)}</div>;
}
