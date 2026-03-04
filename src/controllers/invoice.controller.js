//import {invoiceSchema} from '../models/invoice.model.js'
import { getTotalInvoice, createInvoice } from "../service/invoice.service.js";
//import { getMedicinePrice } from '../service/sellMedicine.servive.js';

export const createSale = async (req, res) => {
  try {
    const result = await createInvoice(req.body);

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
