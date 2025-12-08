import { Module } from '@nestjs/common';
import { CommonDomainModule } from 'apps/common/common-domain/common-domain.module';

@Module({
  imports: [CommonDomainModule],
})
export class OrderDomainCoreModule {}
