import { Publisher } from './base-publisher';
import { DreamticketCreatedEvent } from './dreamticket-created-event';
import { Subjects } from './subjects';

export class DreamticketCreatedPublisher extends Publisher<DreamticketCreatedEvent> {
  subject: Subjects.DreamticketCreated = Subjects.DreamticketCreated;
}
