import { Module } from '@nestjs/common';
import { OrderDomainCoreModule } from './order-domain-core/order-domain-core.module';
import { OrderApplicationServiceModule } from './order-application-service/order-application-service.module';

@Module({
  imports: [OrderDomainCoreModule, OrderApplicationServiceModule],
})
export class OrderDomainModule {}
