import Invoice from "../models/invoice.model.js";
import InvoiceDetail from "../models/invoiceDetails.model.js";
import { createInvoice } from "../service/invoice.service.js";
import { generateFSInvoice } from "../service/generateFSInvoice.service.js";
import { catchAsync } from "../service/catchAsync.service.js";

export const createSale = catchAsync(async (req, res) => {
  const result = await createInvoice(req.body);
  await generateFSInvoice(result);

  res.status(201).json({
    msg: "Factura creada",
    result,
  });
});

export const getInvoices = catchAsync(async (req, res) => {
  const { from = 0, limit = 5 } = req.query;
  // const query = { status: true };
  const [total, invoices] = await Promise.all([
    Invoice.countDocuments(),
    Invoice.find().skip(Number(from)).limit(Number(limit)),
  ]);
  res.status(200).json({
    total,
    invoices,
  });
});

export const getInvoice = catchAsync(async (req, res) => {
  const { id } = req.params;

  const invoice = await Invoice.findById(id);

  const details = await InvoiceDetail.find({ invoice: id });

  res.status(200).json({
    invoice,
    details,
  });
});
