import Link from 'next/link';

export default function ConversationList() {
  return (
    <ul className="list-inside list-none">
      <Link href={`/conversations/${Date.now()}`} className="p-3 hover:bg-gray-800 hover:rounded truncate block">
        5 cups chopped Porcini mushrooms
      </Link>
    </ul>
  )
}


