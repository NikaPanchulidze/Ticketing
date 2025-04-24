import mongoose from "mongoose";
import { OrderStatus } from "@npticketing/common";
import { TicketAttrs } from "./ticket"

export { OrderStatus };

export interface OrderAttrs extends Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketAttrs;
}

const orderSchema = new mongoose.Schema<OrderAttrs>({
  userId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
    default: OrderStatus.Created
  },
  expiresAt: {
    type: mongoose.Schema.Types.Date
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ticket"
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id
      delete ret._id
      delete ret.password;
      delete ret.__v;
    }
  }
});

const Order = mongoose.model<OrderAttrs>("Order", orderSchema);

export { Order };