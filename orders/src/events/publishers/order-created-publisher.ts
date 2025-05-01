import { Publisher, OrderCreatedEvent, Subjects } from "@npticketing/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
