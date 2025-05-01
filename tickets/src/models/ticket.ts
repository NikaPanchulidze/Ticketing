import mongoose from "mongoose";

// 1. Define attributes needed to create a ticket
interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

// 2. Define the properties a Ticket document has
interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

// 3. Define custom static methods on the Ticket model
interface TicketModel extends mongoose.Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc;
}

// 4. Define the schema
const ticketSchema = new mongoose.Schema<TicketDoc>({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    }
  }
});

// 5. Add static build method for type-safe construction
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

// 6. Define and export the model
const Ticket = mongoose.model<TicketDoc, TicketModel>("Ticket", ticketSchema);

export { Ticket };
