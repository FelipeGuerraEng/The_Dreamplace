import { Message } from 'node-nats-streaming';
import {
  Listener,
  FundingCreatedEvent,
  Subjects,
} from '@davidhume/commoncodev10';
import { queueGroupName } from './queue-group-name';
import { Dreamticket } from '../../models/dreamticket';
import { DreamticketUpdatedPublisher } from '../publishers/dreamticket-updated-publisher';

export class FundingCreatedListener extends Listener<FundingCreatedEvent> {
  subject: Subjects.FundingCreated = Subjects.FundingCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: FundingCreatedEvent['data'], msg: Message) {
    const dreamticket = await Dreamticket.findById(data.dreamticket.id);

    if (!dreamticket) {
      throw new Error('Dreamticket not found');
    }

    dreamticket.set({ fundingId: data.id });

    await dreamticket.save();
    await new DreamticketUpdatedPublisher(this.client).publish({
      id: dreamticket.id,
      price: dreamticket.price,
      title: dreamticket.title,
      userId: dreamticket.userId,
      userName: dreamticket.userName,
      fundingId: dreamticket.fundingId,
      version: dreamticket.version,
    });

    msg.ack();
  }
}
