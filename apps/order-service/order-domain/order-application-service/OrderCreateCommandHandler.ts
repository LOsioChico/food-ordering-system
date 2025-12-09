import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderResponse } from './domain/dto/create/CreateOrderResponse';
import { CreateOrderCommand } from './domain/dto/create/CreateOrderCommand';
import type { OrderDomainService } from '../order-domain-core/OrderDomainService';
import type { OrderRepository } from './domain/ports/output/repository/OrderRepository';
import type { CustomerRepository } from './domain/ports/output/repository/CustomerRepository';
import type { RestaurantRepository } from './domain/ports/output/repository/RestaurantRepository';
import { OrderDataMapper } from './domain/mapper/OrderDataMapper';
import { DataSource, EntityManager } from 'typeorm';
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
    return await this.dataSource.transaction<CreateOrderResponse>(
      async (manager) => {
        await this.checkCustomer(manager, createOrderCommand.getCustomerId());
        const restaurant = await this.checkRestaurant(
          manager,
          createOrderCommand,
        );
        const order =
          this.orderDataMapper.createOrderCommandToOrder(createOrderCommand);
        this.orderDomainService.validateAndInitiateOrder(order, restaurant);

        const orderResult = await this.saveOrder(manager, order);
        this.logger.log(
          `Order is created with id: ${orderResult.getId().getValue()}`,
        );
        return this.orderDataMapper.orderToCreateOrderResponse(orderResult);
      },
    );
  }

  private async checkRestaurant(
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

  private async checkCustomer(
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

  private async saveOrder(
    manager: EntityManager,
    order: Order,
  ): Promise<Order> {
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
