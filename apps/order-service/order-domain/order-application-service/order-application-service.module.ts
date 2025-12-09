import { Module } from '@nestjs/common';
import { OrderDomainCoreModule } from '../order-domain-core/order-domain-core.module';
import { CommonDomainModule } from 'apps/common/common-domain/common-domain.module';

@Module({
  imports: [OrderDomainCoreModule, CommonDomainModule],
})
export class OrderApplicationServiceModule {}
