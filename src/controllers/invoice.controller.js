import Invoice from "../models/invoice.model.js";
import InvoiceDetail from "../models/invoiceDetails.model.js";
import { createInvoice } from "../service/invoice.service.js";
import { generateFSInvoice } from "../service/generateFSInvoice.service.js";

export const createSale = async (req, res) => {
  try {
    const result = await createInvoice(req.body);
    await generateFSInvoice(result);

    res.status(201).json({
      msg: "Factura creada",
      result,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getInvoices = async (req, res) => {
  try {
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
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

export const getInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await Invoice.findById(id);

    const details = await InvoiceDetail.find({ invoice: id });

    res.status(200).json({
      invoice,
      details,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
