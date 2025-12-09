import { Module } from '@nestjs/common';
import { OrderDomainModule } from '../order-domain/order-domain.module';
import { OrderApplicationModule } from '../order-application/order-application.module';
import { OrderDataAccessModule } from '../order-data-access/order-data-access.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot(),
    OrderDomainModule,
    OrderApplicationModule,
    OrderDataAccessModule,
  ],
})
export class OrderServiceModule {}
