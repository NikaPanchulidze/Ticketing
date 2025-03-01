import mongoose from "mongoose";
import { Password } from "../services/password";
// An interface that describes the properties
// that are required to create new User
export interface UserAttrs extends Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<UserAttrs>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre("save", async function(next) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  next();
})

const User = mongoose.model<UserAttrs>("User", userSchema);

export { User };