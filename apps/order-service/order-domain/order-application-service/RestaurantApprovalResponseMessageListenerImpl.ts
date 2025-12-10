import { Injectable, Logger } from '@nestjs/common';
import { RestaurantApprovalResponse } from './domain/dto/message/RestaurantApprovalResponse';
import { RestaurantApprovalResponseMessageListener } from './domain/ports/input/message/listener/restaurant-approval/RestaurantApprovalResponseMessageListener';

@Injectable()
export class RestaurantApprovalResponseMessageListenerImpl implements RestaurantApprovalResponseMessageListener {
  private readonly logger = new Logger(
    RestaurantApprovalResponseMessageListenerImpl.name,
  );

  orderApproved(restaurantApprovalResponse: RestaurantApprovalResponse): void {
    throw new Error('Method not implemented.');
  }

  orderRejected(restaurantApprovalResponse: RestaurantApprovalResponse): void {
    throw new Error('Method not implemented.');
  }
}
