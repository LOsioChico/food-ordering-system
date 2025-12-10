import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderResponse } from './domain/dto/create/CreateOrderResponse';
import { CreateOrderCommand } from './domain/dto/create/CreateOrderCommand';
import { OrderDataMapper } from './domain/mapper/OrderDataMapper';
import { OrderCreateHelper } from './OrderCreateHelper';
import type { OrderCreatedPaymentRequestMessagePublisher } from './domain/ports/output/message/publisher/payment/OrderCreatedPaymentRequest';

@Injectable()
export class OrderCreateCommandHandler {
  private readonly logger = new Logger(OrderCreateCommandHandler.name);

  constructor(
    private readonly orderDataMapper: OrderDataMapper,
    private readonly orderCreateHelper: OrderCreateHelper,
    private readonly orderCreatedPaymentRequestMessagePublisher: OrderCreatedPaymentRequestMessagePublisher,
  ) {}

  public async createOrder(
    createOrderCommand: CreateOrderCommand,
  ): Promise<CreateOrderResponse> {
    const orderCreatedEvent =
      await this.orderCreateHelper.persistOrder(createOrderCommand);
    this.logger.log(
      `Order is created with id: ${orderCreatedEvent.getOrder().getId().toString()}`,
    );
    this.orderCreatedPaymentRequestMessagePublisher.publish(orderCreatedEvent);
    return this.orderDataMapper.orderToCreateOrderResponse(
      orderCreatedEvent.getOrder(),
    );
  }
}
