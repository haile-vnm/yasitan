export default interface Message {
  _id: string;
  content: string;
  ownerId: string;
  convoId: string;
  metadata?: {
    secondaryId: string;
  };

  createdAt: number;
  updatedAt: number;
}
