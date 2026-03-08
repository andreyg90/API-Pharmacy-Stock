import mongoose from "mongoose";
import Invoice from "../models/invoice.model.js";
import InvoiceDetail from "../models/invoiceDetails.model.js";
import { completeDataDatails } from "./invoiceDetail.service.js";
import {
  verifyStockMedicine,
  updateStockMedicine,
} from "./sellMedicine.servive.js";

export const getTotalInvoice = async ({ clientName, detailInvoices }) => {
  let total = detailInvoices.reduce((acc, detail) => {
    return acc + detail.quantity;
  }, 0);

  return total;
};

export const createInvoice = async (body) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { clientName, detailInvoices } = body;

    const details = await completeDataDatails(detailInvoices);

    await verifyStockMedicine(details);

    const total = details.reduce((acumulador, { amount }) => {
      return acumulador + amount;
    }, 0);

    const invoice = await Invoice.create([{ clientName, total }], { session });
    const idInvoice = invoice[0]._id;

    await InvoiceDetail.insertMany(
      details.map(({ medicine, quantity, unitPrice, amount }) => ({
        invoice: idInvoice,
        medicine,
        quantity,
        unitPrice,
        amount,
      })),
      { session },
    );

    for (const { medicine, quantity } of details) {
      await updateStockMedicine(medicine, quantity, session);
    }

    await session.commitTransaction();
    session.endSession();
    return { invoice: invoice[0], details };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
