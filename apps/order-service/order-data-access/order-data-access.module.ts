import { Module } from '@nestjs/common';
import { OrderApplicationServiceModule } from '../order-domain/order-application-service/order-application-service.module';

@Module({
  imports: [OrderApplicationServiceModule],
})
export class OrderDataAccessModule {}
