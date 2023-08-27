import { Textarea } from 'flowbite-react';
import AppButton from '../shared/button';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { FormEvent, useState } from 'react';
import {
  addMessage,
  initMessages,
  updateMessage,
  useConversationMessagesDispatch,
  useConversationMessagesState,
} from '@/contexts/conversation-messages';
import { chat, createConversation } from '@/integrations/api/conversation';
import { useProfileState } from '@/contexts/profile';

export default function Composer() {
  const messageDispatch = useConversationMessagesDispatch();
  const { conversationId } = useConversationMessagesState();
  const { user } = useProfileState();
  const [content, setContent] = useState('');

  const submitMessage = (event: FormEvent) => {
    event.preventDefault();
    // should use uuid instead
    const tempMessageId = Math.random() + '';

    addMessage(messageDispatch, {
      content: content.trim(),
      status: 'sending',
      ownerId: user?._id,
      _id: tempMessageId,
    });

    setContent('');

    const conversation = conversationId
      ? Promise.resolve(conversationId)
      : createConversation().then(conversation => {
          initMessages(messageDispatch, conversation._id);
          return conversation._id;
        });

    conversation.then(conversationId => {
      chat(conversationId, content).then(message => {
        updateMessage(messageDispatch, tempMessageId, message);
      });
    });
  };

  return (
    <div className="w-full relative">
      <form onSubmit={submitMessage}>
        <Textarea
          className="pr-12 bg-gray-900 text-white"
          name="content"
          onChange={value => setContent(value.target.value)}
          placeholder="Enter your message"
          required
          rows={4}
          value={content}
        />

        <AppButton category={'white'} className="absolute right-2 bottom-2">
          <PaperAirplaneIcon className="h-7 w-7 text-cyan-200"></PaperAirplaneIcon>
        </AppButton>
      </form>
    </div>
  );
}
