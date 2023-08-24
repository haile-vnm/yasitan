import { ReactNode, useEffect, useState } from 'react';
import HomeLayout from '.';
import { useRouter } from 'next/navigation';

export default function ConversationsLayout({ children }: { children: ReactNode }) {
  const [t, setT] = useState(0);
  const router = useRouter();
  useEffect(() => setT(Date.now()), []);

  return (
    <HomeLayout>
      <div className="flex">
        <div className="h-full w-30 bg-blue-200">
          Conversation lists
          <button onClick={() => router.push(`./${Date.now()}`)}>Next Convo</button>
        </div>
        <div className="h-full w-full">
          <div>
            Content
            {children}
          </div>
          <div>Composer {t}</div>
        </div>
      </div>
    </HomeLayout>
  )
}
