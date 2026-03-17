import { Schema, model } from "mongoose";

const CounterSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

export default model("Counter", CounterSchema);
