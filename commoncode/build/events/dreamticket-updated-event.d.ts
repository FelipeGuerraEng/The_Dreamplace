import { Subjects } from './subjects';
export interface DreamticketUpdatedEvent {
  subject: Subjects.DreamticketUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    userName: string;
    fundingId?: string;
  };
}
