import { registerAs } from '@nestjs/config';

export default registerAs('kafka-consumer-config', () => ({
  keyDeserializerClass: '',
  valueDeserializerClass: '',
  autoOffsetReset: '',
  specificAvroReaderKey: '',
  specificAvroReader: '',
  batchListener: false,
  autoStartup: false,
  concurrencyLevel: 0,
  sessionTimeoutMs: 0,
  heartbeatIntervalMs: 0,
  maxPollIntervalMs: 0,
  pollTimeoutMs: 0,
  maxPollRecords: 0,
  maxPartitionFetchBytesDefault: 0,
  maxPartitionFetchBytesBoostFactor: 0,
}));
