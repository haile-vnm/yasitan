import { Textarea } from 'flowbite-react';
import AppButton from '../shared/button';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { FormEvent, useState } from 'react';
interface ComposerProps {
  onSubmit: (content: string) => void;
}
export default function Composer({ onSubmit }: ComposerProps) {
  const [content, setContent] = useState('');

  const submitMessage = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(content);
    setContent('');
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
