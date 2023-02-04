import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  FundingStatus,
} from '@davidhume/commoncodev10';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Funding } from '../../models/funding';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const funding = await Funding.findById(data.fundingId);

    if (!funding) {
      throw new Error('Funding not found');
    }

    funding.set({
      status: FundingStatus.Complete,
    });
    await funding.save();

    msg.ack();
  }
}
