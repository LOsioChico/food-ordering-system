import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderResponse } from './domain/dto/create/CreateOrderResponse';
import { CreateOrderCommand } from './domain/dto/create/CreateOrderCommand';
import type { OrderDomainService } from '../order-domain-core/OrderDomainService';
import type { OrderRepository } from './domain/ports/output/repository/OrderRepository';
import type { CustomerRepository } from './domain/ports/output/repository/CustomerRepository';
import type { RestaurantRepository } from './domain/ports/output/repository/RestaurantRepository';
import { OrderDataMapper } from './domain/mapper/OrderDataMapper';
import { DataSource } from 'typeorm';
import { UUID } from 'node:crypto';
import { Customer } from '../order-domain-core/entity/Customer';
import { OrderDomainException } from '../order-domain-core/exception/OrderDomainException';
import { Restaurant } from '../order-domain-core/entity/Restaurant';
import { Order } from '../order-domain-core/entity/Order';

@Injectable()
export class OrderCreateCommandHandler {
  private readonly logger = new Logger(OrderCreateCommandHandler.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly orderDomainService: OrderDomainService,
    private readonly orderRepository: OrderRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly restaurantRespository: RestaurantRepository,
    private readonly orderDataMapper: OrderDataMapper,
  ) {}

  public async createOrder(
    createOrderCommand: CreateOrderCommand,
  ): Promise<CreateOrderResponse> {
    return await this.dataSource.transaction(async (manager) => {
      this.checkCustomer(createOrderCommand.getCustomerId());
      const restaurant = this.checkRestaurant(createOrderCommand);
      const order =
        this.orderDataMapper.createOrderCommandToOrder(createOrderCommand);
      const orderCreatedEvent =
        this.orderDomainService.validateAndInitiateOrder(order, restaurant);

      const orderResult = await this.saveOrder(order);
      this.logger.log(
        `Order is created with id: ${orderResult.getId().getValue()}`,
      );
      return this.orderDataMapper.orderToCreateOrderResponse(orderResult);
    });
  }

  private checkRestaurant(createOrderCommand: CreateOrderCommand): Restaurant {
    const [restaurantId] =
      this.orderDataMapper.createOrderCommandToRestaurant(createOrderCommand);
    const restaurant =
      this.restaurantRespository.findRestaurantInformation(restaurantId);
    if (!restaurant) {
      this.logger.warn(
        `Could not find restaurant with restaurant id: ${createOrderCommand.getCustomerId()}`,
      );
      throw new OrderDomainException({
        message: `Could not find restaurant with restaurant id: ${createOrderCommand.getCustomerId()}`,
      });
    }
    return restaurant;
  }

  private checkCustomer(customerId: UUID): Customer {
    const customer = this.customerRepository.findCustomer(customerId);
    if (!customer) {
      this.logger.warn(
        `Could not find customer with customer id: ${customerId}`,
      );
      throw new OrderDomainException({
        message: `Could not find customer with customer id: ${customerId}`,
      });
    }
    return customer;
  }

  private async saveOrder(order: Order): Promise<Order> {
    const orderResult = await this.orderRepository.save(order);
    if (!orderResult) {
      throw new OrderDomainException({ message: 'Could not save order!' });
    }
    this.logger.log(
      `Order is saved with id: ${orderResult.getId().toString()}`,
    );
    return orderResult;
  }
}
