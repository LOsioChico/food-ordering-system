import { Module } from '@nestjs/common';
import { OrderDomainCoreModule } from '../order-domain-core/order-domain-core.module';
import { CommonDomainModule } from 'apps/common/common-domain/common-domain.module';
import { OrderApplicationServiceImpl } from './domain/OrderApplicationServiceImpl';
import { OrderCreateCommandHandler } from './domain/OrderCreateCommandHandler';
import { OrderTrackCommandHandler } from './domain/OrderTrackCommandHandler';
import { OrderCreateHelper } from './domain/OrderCreateHelper';
import { OrderDataMapper } from './domain/mapper/OrderDataMapper';
import { PaymentResponseMessageListenerImpl } from './domain/PaymentResponseMessageListenerImpl';
import { RestaurantApprovalResponseMessageListenerImpl } from './domain/RestaurantApprovalResponseMessageListenerImpl';

@Module({
  imports: [OrderDomainCoreModule, CommonDomainModule],
  providers: [
    OrderApplicationServiceImpl,
    OrderCreateCommandHandler,
    OrderTrackCommandHandler,
    OrderCreateHelper,
    OrderDataMapper,
    PaymentResponseMessageListenerImpl,
    RestaurantApprovalResponseMessageListenerImpl,
  ],
  exports: [
    OrderApplicationServiceImpl,
    PaymentResponseMessageListenerImpl,
    RestaurantApprovalResponseMessageListenerImpl,
  ],
})
export class OrderApplicationServiceModule {}
