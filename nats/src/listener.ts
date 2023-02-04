import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { DreamticketCreatedListener } from './events/dreamticket-created-listener';

console.clear();

const stan = nats.connect('thedreamplace', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  new DreamticketCreatedListener(stan).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
