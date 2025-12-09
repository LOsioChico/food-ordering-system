import { Module } from '@nestjs/common';
import { CommonDomainModule } from 'apps/common/common-domain/common-domain.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [CommonDomainModule, LoggerModule.forRoot()],
})
export class OrderDomainCoreModule {}
