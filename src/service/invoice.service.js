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
  const { clientName, detailInvoices } = body;

  const details = await completeDataDatails(detailInvoices);
  //console.log(details);
  await verifyStockMedicine(details);

  const total = details.reduce((acumulador, { amount }) => {
    return acumulador + amount;
  }, 0);

  const invoice = await Invoice.create({ clientName, total });
  const idInvoice = invoice._id;

  await InvoiceDetail.insertMany(
    details.map(({ medicine, quantity, unitPrice, amount }) => ({
      invoice: idInvoice,
      medicine,
      quantity,
      unitPrice,
      amount,
    })),
  );

  for (const { medicine, quantity } of details) {
    await updateStockMedicine(medicine, quantity);
  }

  return { invoice, details };
};
