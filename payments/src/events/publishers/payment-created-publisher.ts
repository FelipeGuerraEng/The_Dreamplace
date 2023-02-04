import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from '@davidhume/commoncodev10';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
