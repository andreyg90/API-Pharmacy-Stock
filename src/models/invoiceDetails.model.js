import { Schema, model } from "mongoose";

const invoiceDetailSchema = new Schema(
  {
    invoice: {
      type: Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },

    medicine: {
      type: Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default model("InvoiceDetail", invoiceDetailSchema);
