import { Schema, model } from "mongoose";

const invoiceSchema = new Schema(
  {
    clientName: {
      type: String,
      required: true,
    },
    invoiceNumber: {
      type: Number,
      required: true,
    },

    dateInvoice: {
      type: Date,
      default: Date.now(),
    },

    total: {
      type: Number,
      required: false,
      default: 0,
    },
    status: {
      type: String,
      default: "active",
    },
  },
  { timestamps: true },
);

export default model("Invoice", invoiceSchema);
