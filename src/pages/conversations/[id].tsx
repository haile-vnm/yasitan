import { useRouter } from 'next/router';
import ConversationsLayout from '@/components/layouts/home/conversations';
import { embedPageLayout } from '../_app';

export default function ConversationDetail() {
  const router = useRouter();
  return <>Conversation Details at {router.query.id}</>;
}

embedPageLayout(ConversationDetail, ConversationsLayout);
