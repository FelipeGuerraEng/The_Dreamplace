import {
  Publisher,
  Subjects,
  DreamticketUpdatedEvent,
} from '@davidhume/commoncodev10';

export class DreamticketUpdatedPublisher extends Publisher<DreamticketUpdatedEvent> {
  subject: Subjects.DreamticketUpdated = Subjects.DreamticketUpdated;
}
