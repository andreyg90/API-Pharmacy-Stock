import { Schema, model } from "mongoose";

const creditNoteSchema = new Schema(
  {
    clientName: {
      type: String,
      require: true,
    },
    creditNumber: {
      type: Number,
      required: true,
    },
    invoice: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },

    dateCreditNote: {
      type: Date,
      default: Date.now(),
    },

    total: {
      type: Number,
      require: false,
      default: 0,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default model("CreditNode", creditNoteSchema);
