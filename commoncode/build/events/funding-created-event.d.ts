import { Subjects } from './subjects';
import { FundingStatus } from './types/funding-status';
export interface FundingCreatedEvent {
  subject: Subjects.FundingCreated;
  data: {
    id: string;
    version: number;
    status: FundingStatus;
    userId: string;
    expiresAt: string;
    dreamticket: {
      id: string;
      price: number;
    };
  };
}
