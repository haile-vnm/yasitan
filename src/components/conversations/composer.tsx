import { Textarea } from 'flowbite-react';
import AppButton from '../shared/button';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

export default function Composer() {
  return (
    <div className="w-full relative">
      <Textarea
        className="pr-12 bg-gray-900"
        placeholder="Enter your message"
        required
        rows={4}
      />

      <AppButton category={'white'} className="absolute right-2 bottom-2">
        <PaperAirplaneIcon className="h-7 w-7 text-cyan-200"></PaperAirplaneIcon>
      </AppButton>
    </div>
  );
}
