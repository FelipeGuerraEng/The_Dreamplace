import {
  Listener,
  FundingcanceledEvent,
  Subjects,
} from '@davidhume/commoncodev10';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Dreamticket } from '../../models/dreamticket';
import { DreamticketUpdatedPublisher } from '../publishers/dreamticket-updated-publisher';

export class FundingcanceledListener extends Listener<FundingcanceledEvent> {
  subject: Subjects.Fundingcanceled = Subjects.Fundingcanceled;
  queueGroupName = queueGroupName;

  async onMessage(data: FundingcanceledEvent['data'], msg: Message) {
    const dreamticket = await Dreamticket.findById(data.dreamticket.id);

    if (!dreamticket) {
      throw new Error('Dreamticket not found');
    }

    dreamticket.set({ fundingId: undefined });
    await dreamticket.save();
    await new DreamticketUpdatedPublisher(this.client).publish({
      id: dreamticket.id,
      fundingId: dreamticket.fundingId,
      userId: dreamticket.userId,
      userName: dreamticket.userName,
      price: dreamticket.price,
      title: dreamticket.title,
      version: dreamticket.version,
    });

    msg.ack();
  }
}
