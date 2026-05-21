import { Schema, model } from "mongoose";

const batchSchema = new Schema(
  {
    batchNumber: {
      type: Number,
      required: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    costPrice: {
      type: Number,
      required: true,
    },
    medicine: {
      type: Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
  },
  { timestamps: true },
);

export default model("Batch", batchSchema);
