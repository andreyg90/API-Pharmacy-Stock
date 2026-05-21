import medicineModel from "../models/medicine.model.js";
import {
  sellMedicineService,
  getLowStackMedicines,
} from "../service/sellMedicine.servive.js";
import { generateNextSequence } from "../helpers/count.helper.js";
import { catchAsync } from "../service/catchAsync.service.js";

const Medicine = medicineModel;

export const getMedicine = catchAsync(async (req, res) => {
  const { id } = req.params;

  const medicine = await Medicine.findById(id);

  res.status(200).json({
    medicine,
  });
});

export const getMedicines = catchAsync(async (req, res) => {
  const { from = 0, limit = 5 } = req.query;
  const query = { status: true };

  const [total, medicines] = await Promise.all([
    Medicine.countDocuments(query),
    Medicine.find(query)
      .sort({ name: 1 })
      .skip(Number(from))
      .limit(Number(limit)),
  ]);
  res.status(200).json({
    msg: "Medicinas registradas",
    total,
    from: Number(from),
    limit: Number(limit),
    medicines,
  });
});

export const createMedicine = catchAsync(async (req, res) => {
  const {
    name,
    description,
    price,
    stock,
    type,
    entryDate,
    expirationDate,
    status,
  } = req.body;

  //generar un numero único para medicine
  const medicineNumber = await generateNextSequence("medicine");
  const medicine = new Medicine({
    name,
    medicineNumber,
    description,
    price,
    stock,
    type,
    entryDate,
    expirationDate,
    status,
  });
  await medicine.save();

  res.status(200).json({
    msg: "Se ha registrado correctamente el medicamento",
  });
});

export const updateMedicine = catchAsync(async (req, res) => {
  const { id } = req.params;

  const {
    name,
    description,
    price,
    stock,
    type,
    entryDate,
    expirationDate,
    status,
  } = req.body;

  const data = {
    name,
    description,
    price,
    stock,
    type,
    entryDate,
    expirationDate,
    status,
  };

  await Medicine.findByIdAndUpdate(id, data, { returnDocument: "after" });

  res.status(200).json({
    msg: "El medicamento ha sido actualizado",
  });
});

export const deleteMedicine = catchAsync(async (req, res) => {
  const { id } = req.params;

  await Medicine.findByIdAndUpdate(
    id,
    { status: false },
    { returnDocument: "after" },
  );

  res.status(200).json({
    msg: "Se ha eliminado satisfactoriamente el medicamento",
  });
});

export const sellMedicine = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const result = await sellMedicineService(id, quantity);

  res.status(200).json({
    message: result.msg,
    medicine: result.medicine,
  });
});

export const lowStockMedicine = catchAsync(async (req, res) => {
  const medicines = await getLowStackMedicines();

  res.status(200).json({
    msg: "Medicamentos con bajo stock",
    medicines,
  });
});
