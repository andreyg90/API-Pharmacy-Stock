import Invoice from "../models/invoice.model.js";
import InvoiceDetail from "../models/invoiceDetails.model.js";
import { generateNextSequence } from "../helpers/count.helper.js";
import CreditNote from "../models/creditNote.model.js";
import CreditNoteDetail from "../models/creditNoteDetails.model.js";
import mongoose from "mongoose";
import { updateStockMedicine } from "../service/sellMedicine.servive.js";

export const createCreditNote = async (req) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { reason } = req.body;
    const { idInvoice } = req.params;
    const invoice = await Invoice.findOne({
      _id: idInvoice,
      status: "active",
    });

    // esta validación se hace aquí mientras tanto
    if (!invoice) {
      throw new Error("Factura no encontrada con ese numero ");
    }

    const details = await InvoiceDetail.find({ invoice });
    let creditNoteDetails = [];
    /***************************************************** */
    if (req.body.type === "partial") {
      const { detailToReverse } = req.body;
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

      /**************************************************** */
    } else if (req.body.type === "total") {
      for (const element of details) {
        creditNoteDetails.push(element);
      }
    }
    /*************************************************** */
    const total = creditNoteDetails.reduce((acumulador, { amount }) => {
      return acumulador + amount;
    }, 0);

    const creditNumber = await generateNextSequence("creditNote");

    const creditNote = await CreditNote.create(
      [
        {
          clientName: invoice.clientName,
          creditNumber,
          invoice: invoice._id,
          total,
          reason,
        },
      ],
      { session },
    );

    await CreditNoteDetail.insertMany(
      creditNoteDetails.map(({ medicine, quantity, unitPrice, amount }) => ({
        creditNote: creditNote[0]._id,
        medicine,
        quantity,
        unitPrice,
        amount,
      })),
      { session },
    );
    //ACTUALIZACION DE STOCK

    for (const { medicine, quantity } of creditNoteDetails) {
      await updateStockMedicine(medicine, quantity, session);
    }

    if (req.body.type === "total") {
      await Invoice.findByIdAndUpdate(
        idInvoice,
        { status: "inactive" },
        { session },
      );
    }

    await session.commitTransaction();
    session.endSession();

    return { creditNote: creditNote[0], creditNoteDetails }; // AQUI VALORAMOS QUE RETORNAMOS
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
