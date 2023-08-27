import { Textarea } from 'flowbite-react';
import AppButton from '../shared/button';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { FormEvent } from 'react';
import {
  addMessage,
  initMessages,
  updateMessage,
  useConversationMessagesDispatch,
  useConversationMessagesState,
} from '@/contexts/conversation-messages';
import { chat, createConversation } from '@/integrations/api/conversation';

export default function Composer() {
  const messageDispatch = useConversationMessagesDispatch();
  const { conversationId } = useConversationMessagesState();

  const submitMessage = (event: FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    let { content } = Object.fromEntries(formData.entries()) as {
      content: string;
    };
    content = content.trim();

    // should use uuid instead
    const tempMessageId = Math.random() + '';

    addMessage(messageDispatch, {
      content,
      status: 'sending',
      _id: tempMessageId,
    });

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
          placeholder="Enter your message"
          required
          rows={4}
        />

        <AppButton category={'white'} className="absolute right-2 bottom-2">
          <PaperAirplaneIcon className="h-7 w-7 text-cyan-200"></PaperAirplaneIcon>
        </AppButton>
      </form>
    </div>
  );
}
