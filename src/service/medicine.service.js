import Medicine from "../models/medicine.model.js";

export const getMedicineById = async (medicineId) => {
  const medicine = await Medicine.findById(medicineId);

  if (!medicine) {
    throw new Error("Medicamento no encontrado");
  } else {
    return medicine;
  }
};

export const getNameMedicineById = async (medicineId) => {
  const medicine = await Medicine.findById(medicineId);

  if (!medicine) {
    throw new Error("Medicamento no encontrado");
  } else {
    return medicine.name;
  }
};
