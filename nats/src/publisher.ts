import nats from 'node-nats-streaming';
import { DreamticketCreatedPublisher } from './events/dreamticket-created-publisher';

console.clear();

const stan = nats.connect('thedreamplace', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new DreamticketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20,
    });
  } catch (err) {
    console.error(err);
  }

  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: '$20',
  // });

  // stan.publish('DreamticketCreated', data, () => {
  //   console.log('Event published');
  // });
});
