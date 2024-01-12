import { useRouter } from 'next/router';
import { getLayout } from '@/components/layouts/home/conversations';
import { embedPageLayout } from '../_app';
import If from '@/components/shared/if';
import MessagesHistory from '@/components/conversations/messages-history';
import Composer from '@/components/conversations/composer';
import { useEffect, useState } from 'react';
import {
  chat,
  createConversation,
  getConvoMessages,
} from '@/integrations/api/conversation';
import {
  addConversation,
  addMessage,
  initMessages,
  useConversationMessagesDispatch,
  useConversationMessagesState,
} from '@/contexts/conversation-messages';
import Message from '@/integrations/api/models/message';
import { useProfileState } from '@/contexts/profile';

export default function ConversationDetail() {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const id = router.query.id as string;
  const convoMessagesDispatch = useConversationMessagesDispatch();
  const { conversationId } = useConversationMessagesState();
  const { user } = useProfileState();

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

  const sendMessage = (content: string) => {
    // should use uuid instead
    const secondaryId = Math.random() + '';

    const message: Partial<Message> = {
      content: content.trim(),
      ownerId: user?._id,
      metadata: { secondaryId },
    };

    addMessage(convoMessagesDispatch, message);

    const conversation = conversationId
      ? Promise.resolve(conversationId)
      : createConversation().then(conversation => {
          initMessages(convoMessagesDispatch, conversation._id);
          addConversation(convoMessagesDispatch, conversation);
          return conversation._id;
        });

    conversation.then(conversationId => {
      chat(conversationId, message).then(message => {
        addMessage(convoMessagesDispatch, message);
      });
    });
  };

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
          <div className="w-full overflow-auto h-full">
            <MessagesHistory></MessagesHistory>
          </div>
        </If>
      </If>
      <div className="w-full p-6">
        <Composer onSubmit={sendMessage}></Composer>
      </div>
    </div>
  );
}

embedPageLayout(ConversationDetail, getLayout);
