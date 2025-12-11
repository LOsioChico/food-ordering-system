import { registerAs } from '@nestjs/config';

export default registerAs('kafka-config', () => ({
  brokers: [
    'kafka-broker-1:9092',
    'kafka-broker-2:9092',
    'kafka-broker-3:9092',
  ],
  schemaRegistryUrlKey: 'schema-registry-url',
  schemaRegistryUrl: 'http://schema-registry:8081',
  numOfPartitions: 3,
  replicationFactor: 3,
}));
