import { Schema, model } from "mongoose";

const batchSchema = new Schema({
  batchNumber: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  entryDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
  },
  costPrice: {
    type: Number,
    required: true,
  },
});

export default model("Batch", batchSchema);
