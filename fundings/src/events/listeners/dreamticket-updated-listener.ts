import { Message } from 'node-nats-streaming';
import {
  Subjects,
  Listener,
  DreamticketUpdatedEvent,
} from '@davidhume/commoncodev10';
import { Dreamticket } from '../../models/dreamticket';
import { queueGroupName } from './queue-group-name';

export class DreamticketUpdatedListener extends Listener<DreamticketUpdatedEvent> {
  subject: Subjects.DreamticketUpdated = Subjects.DreamticketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: DreamticketUpdatedEvent['data'], msg: Message) {
    const dreamticket = await Dreamticket.findByEvent(data);

    if (!dreamticket) {
      throw new Error('Dreamticket not found');
    }

    const { title, price } = data;
    dreamticket.set({ title, price });
    await dreamticket.save();

    msg.ack();
  }
}
