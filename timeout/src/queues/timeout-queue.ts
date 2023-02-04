import Queue from 'bull';
import { TimeoutCompletePublisher } from '../events/publishers/timeout-complete-publisher';
import { natsWrapper } from '../nats-wrapper';

interface Payload {
  fundingId: string;
}

const timeoutQueue = new Queue<Payload>('funding:timeout', {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

timeoutQueue.process(async (job) => {
  new TimeoutCompletePublisher(natsWrapper.client).publish({
    fundingId: job.data.fundingId,
  });
});

export { timeoutQueue };
