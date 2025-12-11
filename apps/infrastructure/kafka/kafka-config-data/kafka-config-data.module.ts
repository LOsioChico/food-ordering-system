import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import kafkaConfigData from './kafka-config-data';
import kafkaProducerConfigData from './kafka-producer-config-data';
import kafkaConsumerConfigData from './kafka-consumer-config-data';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [kafkaConfigData, kafkaProducerConfigData, kafkaConsumerConfigData],
    }),
  ],
  exports: [ConfigModule],
})
export class KafkaConfigDataModule {}
