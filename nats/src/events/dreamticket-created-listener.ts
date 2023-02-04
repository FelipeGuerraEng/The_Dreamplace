import { Message } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { DreamticketCreatedEvent } from './dreamticket-created-event';
import { Subjects } from './subjects';

export class DreamticketCreatedListener extends Listener<DreamticketCreatedEvent> {
  readonly subject = Subjects.DreamticketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: DreamticketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);

    msg.ack();
  }
}
