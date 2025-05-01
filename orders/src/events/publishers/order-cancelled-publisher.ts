import { Subjects, Publisher, OrderCancelledEvent } from "@npticketing/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}