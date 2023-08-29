import Link from 'next/link';
import { useEffect } from 'react';
import If from '../shared/if';
import { getConversations } from '@/integrations/api/conversation';
import AppButton from '../shared/button';
import { PlusIcon } from '@heroicons/react/24/outline';
import {
  initMessages,
  setConversations,
  useConversationMessagesDispatch,
  useConversationMessagesState,
} from '@/contexts/conversation-messages';

export default function ConversationList() {
  // const [conversations, setList] = useState<Conversation[]>([]);
  const { conversations } = useConversationMessagesState();
  const conversationDispatch = useConversationMessagesDispatch();

  const newChat = () => {
    initMessages(conversationDispatch, '', []);
  };

  useEffect(() => {
    getConversations().then(conversations =>
      setConversations(conversationDispatch, conversations),
    );
  }, []);

  return (
    <div className="h-full">
      <AppButton className="w-full flex items-center" onClick={newChat}>
        <PlusIcon className="h-4 w-4"></PlusIcon>&nbsp;New Chat
      </AppButton>
      <ul className="list-inside list-none pt-3 pb-8 overflow-auto h-full">
        <If condition={conversations} else={<>Loading Conversations</>}>
          <If
            condition={conversations?.length}
            else={<>There is no conversation found</>}
          >
            {conversations?.map(convo => (
              <Link
                className="p-3 hover:bg-gray-800 hover:rounded truncate block"
                href={`/conversations/${convo._id}`}
                key={convo._id}
              >
                {convo.title}
              </Link>
            ))}
          </If>
        </If>
      </ul>
    </div>
  );
}
