import { Message } from 'node-nats-streaming';
import {
  Listener,
  FundingCreatedEvent,
  Subjects,
} from '@davidhume/commoncodev10';
import { queueGroupName } from './queue-group-name';
import { Funding } from '../../models/funding';

export class FundingCreatedListener extends Listener<FundingCreatedEvent> {
  subject: Subjects.FundingCreated = Subjects.FundingCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: FundingCreatedEvent['data'], msg: Message) {
    const funding = Funding.build({
      id: data.id,
      price: data.dreamticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await funding.save();

    msg.ack();
  }
}
