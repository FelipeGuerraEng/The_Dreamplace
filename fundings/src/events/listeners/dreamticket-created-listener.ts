import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  DreamticketCreatedEvent,
} from '@davidhume/commoncodev10';
import { Dreamticket } from '../../models/dreamticket';
import { queueGroupName } from './queue-group-name';

export class DreamticketCreatedListener extends Listener<DreamticketCreatedEvent> {
  subject: Subjects.DreamticketCreated = Subjects.DreamticketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: DreamticketCreatedEvent['data'], msg: Message) {
    const { id, title, userName, price } = data;

    const dreamticket = Dreamticket.build({
      id,
      title,
      userName,
      price,
    });
    await dreamticket.save();

    msg.ack();
  }
}
