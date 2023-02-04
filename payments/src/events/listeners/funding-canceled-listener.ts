import {
  FundingcanceledEvent,
  Subjects,
  Listener,
  FundingStatus,
} from '@davidhume/commoncodev10';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Funding } from '../../models/funding';

export class FundingcanceledListener extends Listener<FundingcanceledEvent> {
  subject: Subjects.Fundingcanceled = Subjects.Fundingcanceled;
  queueGroupName = queueGroupName;

  async onMessage(data: FundingcanceledEvent['data'], msg: Message) {
    const funding = await Funding.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!funding) {
      throw new Error('Funding not found');
    }

    funding.set({ status: FundingStatus.canceled });
    await funding.save();

    msg.ack();
  }
}
