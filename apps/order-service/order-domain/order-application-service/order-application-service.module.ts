import { Module } from '@nestjs/common';
import { OrderDomainCoreModule } from '../order-domain-core/order-domain-core.module';

@Module({
  imports: [OrderDomainCoreModule],
})
export class OrderApplicationServiceModule {}
