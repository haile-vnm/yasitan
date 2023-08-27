export default interface Message {
  _id: string;
  content: string;
  ownerId: string;
  convoId: string;
  status: 'sending' | 'sent';

  createdAt: number;
  updatedAt: number;
}
