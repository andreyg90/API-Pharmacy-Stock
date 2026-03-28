import { Schema, model } from "mongoose";

const creditNoteDetailSchema = new Schema(
  {
    creditNote: {
      type: Schema.Types.ObjectId,
      ref: "CreditNote",
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

export default model("CreditNoteDetail", creditNoteDetailSchema);
