import { registerAs } from '@nestjs/config';

export default registerAs('kafka-producer-config', () => ({
  keySerializerClass: '',
  valueSerializerClass: '',
  compressionType: '',
  acks: '',
  batchSize: 0,
  batchSizeBoostFactor: 0,
  lingerMs: 0,
  requestTimeoutMs: 0,
  retries: 0,
}));
