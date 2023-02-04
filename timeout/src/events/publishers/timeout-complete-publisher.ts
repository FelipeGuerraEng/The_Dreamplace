import {
  Subjects,
  Publisher,
  TimeoutCompleteEvent,
} from '@davidhume/commoncodev10';

export class TimeoutCompletePublisher extends Publisher<TimeoutCompleteEvent> {
  subject: Subjects.TimeoutComplete = Subjects.TimeoutComplete;
}
