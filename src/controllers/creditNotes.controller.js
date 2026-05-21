import { catchAsync } from "../service/catchAsync.service.js";
import {
  createCreditNote,
  getAllCreditNotes,
  getCreditNoteByCreditNumber,
} from "../service/creditNote.service.js";

export const handleInvoiceReversal = catchAsync(async (req, res) => {
  const creditNote = await createCreditNote(req);

  res.status(200).json({
    msg: "Nota de crédito creada",
    creditNote,
  });
});

//aqui estamos usando el manejador de errores global x eso no hay try catch
export const getCreditNotes = catchAsync(async (req, res) => {
  const { total, creditNotesList } = await getAllCreditNotes(req);
  res.status(200).json({
    total,
    creditNotesList,
  });
});
export const getCreditNote = catchAsync(async (req, res) => {
  const { creditNumber } = req.params;

  const creditNote = await getCreditNoteByCreditNumber(creditNumber);
  res.status(200).json({
    creditNote,
  });
});
