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
} from '@/contexts/conversation-messages';

export default function ConversationDetail() {
  const [render, setRender] = useState(false);
  const router = useRouter();
  const id = router.query.id as string;
  const convoMessagesDispatch = useConversationMessagesDispatch();

  useEffect(() => {
    if (render) {
      setRender(false);
    }

    if (id === 'new') {
      setRender(true);
      return;
    }

    getConvoMessages(id as string)
      .then(messages => {
        initMessages(convoMessagesDispatch, id, messages);
        setRender(true);
      })
      .catch(() => {
        router.push('/new');
      });
  }, [id]);

  return (
    <If condition={render} else={<div>Loading conversation</div>}>
      <div className="h-full flex flex-col justify-end">
        <If
          condition={id !== 'new'}
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
        <div className="w-full">
          <Composer></Composer>
        </div>
      </div>
    </If>
  );
}

embedPageLayout(ConversationDetail, getLayout);
