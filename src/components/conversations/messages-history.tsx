import { useConversationMessagesState } from '@/contexts/conversation-messages';

export default function MessagesHistory() {
  const { conversationId } = useConversationMessagesState();
  return <>Messages History at {conversationId}</>;
}
