import { useRouter } from 'next/router';
import { getLayout } from '@/components/layouts/home/conversations';
import { embedPageLayout } from '../_app';
import If from '@/components/shared/if';
import MessagesHistory from '@/components/conversations/messages-history';
import Composer from '@/components/conversations/composer';
import { useEffect, useState } from 'react';
import { getConvoMessages } from '@/integrations/api/conversation';
import {
  initMessages,
  useConversationMessagesDispatch,
  useConversationMessagesState,
} from '@/contexts/conversation-messages';

export default function ConversationDetail() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const id = router.query.id as string;
  const convoMessagesDispatch = useConversationMessagesDispatch();
  const { conversationId } = useConversationMessagesState();

  useEffect(() => {
    if (loaded) {
      setLoaded(false);
    }

    if (id === 'new') {
      setLoaded(true);
      return;
    }

    getConvoMessages(id as string)
      .then(messages => {
        initMessages(convoMessagesDispatch, id, messages.reverse());
        setLoaded(true);
      })
      .catch(() => {
        router.push('/new');
      });
  }, [id]);

  return (
    <div className="h-full flex flex-col justify-end">
      <If condition={loaded} else={<div>Loading conversation</div>}>
        <If
          condition={conversationId}
          else={
            <div className="h-full flex justify-center items-center">
              Let&apos;s start asking whatever you want 🚀
            </div>
          }
        >
          <div className="w-full">
            <MessagesHistory></MessagesHistory>
          </div>
        </If>
      </If>
      <div className="w-full">
        <Composer></Composer>
      </div>
    </div>
  );
}

embedPageLayout(ConversationDetail, getLayout);
