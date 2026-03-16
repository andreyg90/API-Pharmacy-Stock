import medicineModel from "../models/medicine.model.js";
export const getAmountDetails = async (detailInvoices) => {};

export const completeDataDatails = async (details) => {
  const fullDetails = [];

  for (const item of details) {
    const medicine = await medicineModel.findById(item.medicine);
    item.unitPrice = medicine.price;
    item.amount = item.quantity * item.unitPrice;
    fullDetails.push({
      medicine: medicine._id,
      medicineName: medicine.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      amount: item.amount,
    });
  }

  return fullDetails;
};
