import { Schema, model } from "mongoose";

const creditNoteSchema = new Schema(
  {
    clientName: {
      type: String,
      require: true,
    },
    creditNumber: {
      type: Number,
      required,
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
  },
  { timestamps: true },
);

export default model("CreditNode", creditNoteSchema);
