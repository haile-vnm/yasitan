import Conversation from '@/integrations/api/models/conversation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import If from '../shared/if';
import { getConversations } from '@/integrations/api/conversation';

export default function ConversationList() {
  const [list, setList] = useState<Conversation[]>([]);

  useEffect(() => {
    getConversations().then(conversations => setList(conversations));
  }, []);

  return (
    <ul className="list-inside list-none">
      <If condition={list} else={<>Loading Conversations</>}>
        <If condition={list?.length} else={<>There is no conversation found</>}>
          {list?.map(convo => (
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
  );
}
