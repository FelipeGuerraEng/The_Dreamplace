import {
  Subjects,
  Publisher,
  FundingcanceledEvent,
} from '@davidhume/commoncodev10';

export class FundingcanceledPublisher extends Publisher<FundingcanceledEvent> {
  subject: Subjects.Fundingcanceled = Subjects.Fundingcanceled;
}
