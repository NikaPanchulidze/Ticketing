// models/user.ts
import mongoose from "mongoose";
import { Password } from "../services/password";

// 1. Define attributes required to create a User
interface UserAttrs {
  email: string;
  password: string;
}

// 2. Define User document properties returned from Mongo
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

// 3. Define static methods for the User model (for build pattern)
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// 4. Define the user schema
const userSchema = new mongoose.Schema<UserDoc, UserModel>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password; // hide hashed password from API
        delete ret.__v;
      },
    },
    timestamps: true, // optional: adds createdAt and updatedAt
  }
);

// 5. Add pre-save middleware to hash password if it's modified
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  next();
});

// 6. Add static build method to enforce type-safe creation
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// 7. Create and export the model
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
