import { Injectable, Logger } from '@nestjs/common';
import { RestaurantApprovalResponse } from './dto/message/RestaurantApprovalResponse';
import { RestaurantApprovalResponseMessageListener } from './ports/input/message/listener/restaurant-approval/RestaurantApprovalResponseMessageListener';

@Injectable()
export class RestaurantApprovalResponseMessageListenerImpl implements RestaurantApprovalResponseMessageListener {
  private readonly logger = new Logger(
    RestaurantApprovalResponseMessageListenerImpl.name,
  );

  public orderApproved(
    restaurantApprovalResponse: RestaurantApprovalResponse,
  ): void {
    throw new Error('Method not implemented.');
  }

  public orderRejected(
    restaurantApprovalResponse: RestaurantApprovalResponse,
  ): void {
    throw new Error('Method not implemented.');
  }
}
