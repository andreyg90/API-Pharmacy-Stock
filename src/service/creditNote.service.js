import Invoice from "../models/invoice.model.js";
import InvoiceDetail from "../models/invoiceDetails.model.js";
import { generateNextSequence } from "../helpers/count.helper.js";
import CreditNote from "../models/creditNote.model.js";
import CreditNoteDetail from "../models/creditNoteDetails.model.js";
import mongoose from "mongoose";
import { updateStockMedicine } from "../service/sellMedicine.servive.js";

const verifyToUpdateInvoiceStatus = async (type, idInvoice, session) => {
  if (type === "total") {
    await Invoice.findByIdAndUpdate(
      idInvoice,
      { status: "inactive" },
      { session },
    );
  }

  if (type === "partial") {
    const updatedDetails = await InvoiceDetail.find(
      { invoice: idInvoice },
      null,
      { session },
    );

    const allReversed = updatedDetails.every(
      (detail) => detail.quantity === (detail.reversedQuantity || 0),
    );
    if (allReversed) {
      await Invoice.findByIdAndUpdate(
        idInvoice,
        { status: "inactive" },
        { session },
      );
    }
  }
};

/***
 *
 *
 */
export const returnCreditNoteDetails = (detailToReverse, details) => {
  let detailFound;
  let creditNoteDetails = [];

  for (const element of detailToReverse) {
    detailFound = details.find(
      (detail) => detail.medicine.toString() === element.medicine,
    );

    if (!detailFound) {
      throw new Error("El medicamento no pertenece a la factura");
    }

    const available =
      detailFound.quantity - (detailFound.reversedQuantity || 0);

    if (element.quantity > available) {
      throw new Error(`Solo puedes devolver ${available} unidades`);
    }

    creditNoteDetails.push({
      medicine: detailFound.medicine,

      quantity: element.quantity,

      unitPrice: detailFound.unitPrice,
      amount: element.quantity * detailFound.unitPrice,
    });
  }

  return creditNoteDetails;
};

/***
 *
 *
 */

export const createCreditNote = async (req) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const { reason } = req.body;
    const { idInvoice } = req.params; // invoice number
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

      creditNoteDetails = returnCreditNoteDetails(detailToReverse, details);

      //ACTUALIZO LA FACTURA CON LAS CANTIDADES DEVUELTAS PARA QUE NO SE PUEDAN DEVOLVER MAS DE LO QUE SE VENDIO
      for (const { medicine, quantity } of creditNoteDetails) {
        await InvoiceDetail.findOneAndUpdate(
          { invoice: invoice._id, medicine },
          { $inc: { reversedQuantity: quantity } },
          { session },
        );
      }

      /**************************************************** */
    } else if (req.body.type === "total") {
      for (const element of details) {
        creditNoteDetails.push(element);
      }
    }
    /************************LO USAN TODOS*************************** */

    //Calculo el total de la nota de crédito
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

    await verifyToUpdateInvoiceStatus(req.body.type, idInvoice, session);

    //verifico si todas las lineas de la factura fueron devueltas para actualizar el estado de la factura a inactiva

    await session.commitTransaction();
    session.endSession();

    return { creditNote: creditNote[0], creditNoteDetails }; // AQUI VALORAMOS QUE RETORNAMOS
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const getAllCreditNotes = async (req) => {
  const { from = 0, limit = 5 } = req.query;
  const [total, creditNotesList] = await Promise.all([
    CreditNote.countDocuments(),
    CreditNote.find().skip(Number(from)).limit(Number(limit)),
  ]);

  return {
    total,
    creditNotesList,
  };
};

export const getCreditNoteByCreditNumber = async (creditNumber) => {
  const creditNote = await CreditNote.findOne({ creditNumber });
  if (!creditNote) {
    throw new Error("No existe una nota de crédito con ese número");
  }

  return creditNote;
};
