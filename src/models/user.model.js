import { Schema, model } from "mongoose";

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  rol: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },

  status: {
    type: Boolean,
    default: true,
  },
});

export default model("User", userSchema);
