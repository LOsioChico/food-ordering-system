import { Module } from '@nestjs/common';
import { OrderDomainModule } from '../order-domain/order-domain.module';
import { OrderApplicationModule } from '../order-application/order-application.module';
import { OrderDataAccessModule } from '../order-data-access/order-data-access.module';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order-domain/order-domain-core/entity/Order';

@Module({
  imports: [
    LoggerModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'order-service',
      entities: [Order],
      synchronize: true,
    }),
    OrderDomainModule,
    OrderApplicationModule,
    OrderDataAccessModule,
  ],
})
export class OrderServiceModule {}
