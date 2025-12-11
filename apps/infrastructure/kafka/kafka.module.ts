import { Module } from '@nestjs/common';
import { KafkaConsumerModule } from './kafka-consumer/kafka-consumer.module';
import { KafkaModelModule } from './kafka-model/kafka-model.module';
import { KafkaProducerModule } from './kafka-producer/kafka-producer.module';
import { KafkaConfigDataModule } from './kafka-config-data/kafka-config-data.module';

@Module({
  imports: [
    KafkaConsumerModule,
    KafkaModelModule,
    KafkaProducerModule,
    KafkaConfigDataModule,
  ],
  exports: [
    KafkaConsumerModule,
    KafkaModelModule,
    KafkaProducerModule,
    KafkaConfigDataModule,
  ],
})
export class KafkaModule {}
