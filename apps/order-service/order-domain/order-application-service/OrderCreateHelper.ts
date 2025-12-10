import { DataSource, EntityManager } from 'typeorm';
import type { OrderRepository } from './domain/ports/output/repository/OrderRepository';
import type { OrderDomainService } from '../order-domain-core/OrderDomainService';
import type { CustomerRepository } from './domain/ports/output/repository/CustomerRepository';
import type { RestaurantRepository } from './domain/ports/output/repository/RestaurantRepository';
import { OrderDataMapper } from './domain/mapper/OrderDataMapper';
import { CreateOrderCommand } from './domain/dto/create/CreateOrderCommand';
import { OrderCreatedEvent } from '../order-domain-core/event/OrderEvents';
import { Restaurant } from '../order-domain-core/entity/Restaurant';
import { Injectable, Logger } from '@nestjs/common';
import { OrderDomainException } from '../order-domain-core/exception/OrderDomainException';
import { UUID } from 'node:crypto';
import { Customer } from '../order-domain-core/entity/Customer';
import { Order } from '../order-domain-core/entity/Order';

@Injectable()
export class OrderCreateHelper {
  private readonly logger = new Logger(OrderCreateHelper.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly orderDomainService: OrderDomainService,
    private readonly orderRepository: OrderRepository,
    private readonly customerRepository: CustomerRepository,
    private readonly restaurantRespository: RestaurantRepository,
    private readonly orderDataMapper: OrderDataMapper,
  ) {}

  public async persistOrder(
    createOrderCommand: CreateOrderCommand,
  ): Promise<OrderCreatedEvent> {
    return await this.dataSource.transaction<OrderCreatedEvent>(
      async (manager) => {
        await this.checkCustomer(manager, createOrderCommand.getCustomerId());
        const restaurant = await this.checkRestaurant(
          manager,
          createOrderCommand,
        );
        const order =
          this.orderDataMapper.createOrderCommandToOrder(createOrderCommand);
        const orderCreatedEvent =
          this.orderDomainService.validateAndInitiateOrder(order, restaurant);
        this.logger.log(
          `Order is created with id: ${orderCreatedEvent.getOrder().getId().getValue()}`,
        );
        await this.saveOrder(manager, order);
        return orderCreatedEvent;
      },
    );
  }

  public async checkRestaurant(
    manager: EntityManager,
    createOrderCommand: CreateOrderCommand,
  ): Promise<Restaurant> {
    const [restaurantId] =
      this.orderDataMapper.createOrderCommandToRestaurant(createOrderCommand);
    const restaurant =
      await this.restaurantRespository.findRestaurantInformationWithManager(
        manager,
        restaurantId,
      );
    if (!restaurant) {
      this.logger.warn(
        `Could not find restaurant with restaurant id: ${createOrderCommand.getRestaurantId()}`,
      );
      throw new OrderDomainException({
        message: `Could not find restaurant with restaurant id: ${createOrderCommand.getRestaurantId()}`,
      });
    }
    return restaurant;
  }

  public async checkCustomer(
    manager: EntityManager,
    customerId: UUID,
  ): Promise<Customer> {
    const customer = await this.customerRepository.findCustomerWithManager(
      manager,
      customerId,
    );
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

  public async saveOrder(manager: EntityManager, order: Order): Promise<Order> {
    const orderResult = await this.orderRepository.saveWithManager(
      manager,
      order,
    );
    if (!orderResult) {
      throw new OrderDomainException({ message: 'Could not save order!' });
    }
    this.logger.log(
      `Order is saved with id: ${orderResult.getId().toString()}`,
    );
    return orderResult;
  }
}
