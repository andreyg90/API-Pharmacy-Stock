import { createCreditNote } from "../service/creditNote.service.js";

export const handleInvoiceReversal = async (req, res) => {
  try {
    const creditNote = await createCreditNote(req);

    res.status(200).json({
      msg: "Nota de crédito creada",
      creditNote,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
