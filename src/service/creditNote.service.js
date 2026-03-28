import Invoice from "../models/invoice.model.js";
import InvoiceDetail from "../models/invoiceDetails.model.js";
import { generateNextSequence } from "../helpers/count.helper.js";
import CreditNote from "../models/creditNote.model.js";

export const createCreditNote = async (req) => {
  const { idInvoice } = req.params;
  const invoice = await Invoice.findById(idInvoice);

  // esta validación se hace aquí mientras tanto
  if (!invoice) {
    throw new Error("Factura no encontrada con ese numero ");
  }

  const details = await InvoiceDetail.find({ invoice });
  let creditNoteDetails = [];
  /***************************************************** */
  if (req.body.type === "partial") {
    const { reason, detailToReverse } = req.body;
    let detailFound;

    for (const element of detailToReverse) {
      detailFound = details.find(
        (detail) => detail.medicine.toString() === element.medicine,
      );

      if (element.quantity > detailFound.quantity) {
        throw new Error(
          "La cantidad no debe ser mayor a la cantidad registrada en la factura ",
        );
      }
      creditNoteDetails.push({
        medicine: detailFound.medicine,

        quantity: element.quantity,

        unitPrice: detailFound.unitPrice,
        amount: element.quantity * detailFound.unitPrice,
      });
    }
    const total = creditNoteDetails.reduce((acumulador, { amount }) => {
      return acumulador + amount;
    }, 0);

    const creditNumber = await generateNextSequence("invoice");
    console.log(creditNumber);

    // const creditNote = await CreditNote.create({
    //   clientName: invoice.clientName,
    //   creditNumber,
    //   invoice: invoice._id,
    //   total,
    //   reason,
    // });
  }
  /*************************************************** */
};
