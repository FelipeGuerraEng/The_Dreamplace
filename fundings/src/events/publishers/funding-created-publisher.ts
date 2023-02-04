import {
  Publisher,
  FundingCreatedEvent,
  Subjects,
} from '@davidhume/commoncodev10';

export class FundingCreatedPublisher extends Publisher<FundingCreatedEvent> {
  subject: Subjects.FundingCreated = Subjects.FundingCreated;
}
