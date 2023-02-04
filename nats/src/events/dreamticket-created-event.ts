import { Subjects } from './subjects';

export interface DreamticketCreatedEvent {
  subject: Subjects.DreamticketCreated;
  data: {
    id: string;
    title: string;
    price: number;
  };
}
