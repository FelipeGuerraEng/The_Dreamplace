import { Subjects } from './subjects';
export interface DreamticketCreatedEvent {
  subject: Subjects.DreamticketCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    userName: string;
  };
}
