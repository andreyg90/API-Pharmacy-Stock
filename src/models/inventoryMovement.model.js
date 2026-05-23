import { Schema, model } from "mongoose";

const InventoryMovementSchema = new Schema({
  type: {
    type: String,
    enum: ["IN", "OUT"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  batch: {
    type: Schema.Types.ObjectId,
    ref: "Batch",
    required: true,
  },
});

export default model("InventoryMovement", InventoryMovementSchema);
