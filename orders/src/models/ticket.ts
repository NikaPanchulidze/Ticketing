import mongoose from "mongoose";
import { Order, OrderStatus } from "./order";

export interface TicketAttrs extends Document {
  title: string;
  price: number;
  isReserved(): Promise<boolean>;
}

const ticketSchema = new mongoose.Schema<TicketAttrs>({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
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

ticketSchema.methods.isReserved = async function() {
  // this === the ticket documnet that we just called
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ]
    }
  })

  return !!existingOrder;
}

const Ticket = mongoose.model<TicketAttrs>("Ticket", ticketSchema);

export { Ticket };