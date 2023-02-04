import { Subjects } from './subjects';
export interface FundingcanceledEvent {
  subject: Subjects.Fundingcanceled;
  data: {
    id: string;
    version: number;
    dreamticket: {
      id: string;
    };
  };
}
