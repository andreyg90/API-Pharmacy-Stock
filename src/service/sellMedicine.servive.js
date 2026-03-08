import medicineModel from "../models/medicine.model.js";

export const sellMedicineService = async (id, quantity) => {
  const medicine = await medicineModel.findById(id);

  if (!medicine) {
    throw new Error("No se encontró ningún medicamento con ese id");
  }

  if (medicine.stock != 0) {
    if (quantity <= medicine.stock) {
      let new_stock = medicine.stock - quantity;
      medicine.stock = new_stock;
      await medicine.save();
    } else {
      throw new Error(
        "La cantidad debe ser menor o igual al stock del medicamento",
      );
    }
  } else {
    throw new Error("No hay suficiente stock para realizar la compra");
  }

  return { msg: "Se ha realizado la venta con éxito", medicine: medicine };
};

export const getLowStackMedicines = async () => {
  return await medicineModel.find({ stock: { $lte: 3 } });
};

export const updateStockMedicine = async (medicineId, quantity, session) => {
  const result = await medicineModel.findByIdAndUpdate(
    medicineId,
    { $inc: { stock: -quantity } },
    { new: true, session },
  );

  if (!result) {
    throw new Error("Medicamento no encontrado");
  }
};

export const getMedicinePrice = async (id) => {
  const medicine = await medicineModel.find(id);

  return medicine.price;
};

export const verifyStockMedicine = async (details) => {
  for (const element of details) {
    const medicine = await medicineModel.findById(element.medicine);

    if (!medicine) {
      throw new Error("Medicamento no encontrado");
    }

    if (element.quantity > medicine.stock) {
      throw new Error(
        `No hay suficiente stock para la cantidad solicitada, STOCK DE : ${medicine.name} : ${medicine.stock}`,
      );
    }
  }

  return true;
};
