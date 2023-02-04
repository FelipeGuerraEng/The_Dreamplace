import {
  Listener,
  Subjects,
  TimeoutCompleteEvent,
  FundingStatus,
} from '@davidhume/commoncodev10';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Funding } from '../../models/funding';
import { FundingcanceledPublisher } from '../publishers/funding-canceled-publisher';

export class TimeoutCompleteListener extends Listener<TimeoutCompleteEvent> {
  queueGroupName = queueGroupName;
  subject: Subjects.TimeoutComplete = Subjects.TimeoutComplete;

  async onMessage(data: TimeoutCompleteEvent['data'], msg: Message) {
    const funding = await Funding.findById(data.fundingId).populate(
      'dreamticket'
    );

    if (!funding) {
      throw new Error('Funding not found');
    }

    if (funding.status === FundingStatus.Complete) {
      return msg.ack();
    }

    funding.set({
      status: FundingStatus.canceled,
    });
    await funding.save();
    await new FundingcanceledPublisher(this.client).publish({
      id: funding.id,
      version: funding.version,
      dreamticket: {
        id: funding.dreamticket.id,
      },
    });

    msg.ack();
  }
}
