import { createCreditNote } from "../service/creditNote.service.js";

export const handleInvoiceReversal = async (req, res) => {
  try {
    const result = await createCreditNote(req);

    res.status(200).json({
      msg: "Prueba prueba",
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
