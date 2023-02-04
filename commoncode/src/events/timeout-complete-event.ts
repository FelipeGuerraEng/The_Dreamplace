import { Subjects } from './subjects';

export interface TimeoutCompleteEvent {
  subject: Subjects.TimeoutComplete;
  data: {
    fundingId: string;
  };
}
