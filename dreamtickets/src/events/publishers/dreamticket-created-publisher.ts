import {
  Publisher,
  Subjects,
  DreamticketCreatedEvent,
} from '@davidhume/commoncodev10';

export class DreamticketCreatedPublisher extends Publisher<DreamticketCreatedEvent> {
  subject: Subjects.DreamticketCreated = Subjects.DreamticketCreated;
}
