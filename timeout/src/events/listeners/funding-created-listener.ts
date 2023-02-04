import {
  Listener,
  FundingCreatedEvent,
  Subjects,
} from '@davidhume/commoncodev10';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { timeoutQueue } from '../../queues/timeout-queue';

export class FundingCreatedListener extends Listener<FundingCreatedEvent> {
  subject: Subjects.FundingCreated = Subjects.FundingCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: FundingCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log('Waiting this many milliseconds to process the job:', delay);

    await timeoutQueue.add(
      {
        fundingId: data.id,
      },
      {
        delay,
      }
    );

    msg.ack();
  }
}
