import { OrderApprovalStatus } from 'apps/common/common-domain/value-object/OrderApprovalStatus';

type RestaurantApprovalResponseProps = {
  id: string;
  sagaId: string;
  orderId: string;
  restaurantId: string;
  createdAt: Date;
  orderApprovalStatus: OrderApprovalStatus;
  failureMessages: string[];
};

export class RestaurantApprovalResponse {
  private id: string;
  private sagaId: string;
  private orderId: string;
  private restaurantId: string;
  private createdAt: Date;
  private orderApprovalStatus: OrderApprovalStatus;
  private failureMessages: string[];

  constructor(props: RestaurantApprovalResponseProps) {
    this.id = props.id;
    this.sagaId = props.sagaId;
    this.orderId = props.orderId;
    this.restaurantId = props.restaurantId;
    this.createdAt = props.createdAt;
    this.orderApprovalStatus = props.orderApprovalStatus;
    this.failureMessages = props.failureMessages;
  }

  public getId(): string {
    return this.id;
  }

  public getSagaId(): string {
    return this.sagaId;
  }

  public getOrderId(): string {
    return this.orderId;
  }

  public getRestaurantId(): string {
    return this.restaurantId;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getOrderApprovalStatus(): OrderApprovalStatus {
    return this.orderApprovalStatus;
  }

  public getFailureMessages(): string[] {
    return this.failureMessages;
  }
}
