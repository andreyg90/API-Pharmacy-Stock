import medicineModel from "../models/medicine.model.js";
import {
  sellMedicineService,
  getLowStackMedicines,
} from "../service/sellMedicine.servive.js";
import { generateNextSequence } from "../helpers/count.helper.js";

const Medicine = medicineModel;

export const getMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    const medicine = await Medicine.findById(id);

    res.status(200).json({
      medicine,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getMedicines = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      msg: "Server Internal Error",
      error: error.message,
    });
  }
};

export const createMedicine = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      msg: "Error interno del servidor",
      error: error.message,
    });
  }
};

export const updateMedicine = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;

    await Medicine.findByIdAndUpdate(
      id,
      { status: false },
      { returnDocument: "after" },
    );

    res.status(200).json({
      msg: "Se ha eliminado satisfactoriamente el medicamento",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Error Server ",
    });
  }
};

export const sellMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const result = await sellMedicineService(id, quantity);

    res.status(200).json({
      message: result.msg,
      medicine: result.medicine,
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

export const lowStockMedicine = async (req, res) => {
  try {
    const medicines = await getLowStackMedicines();

    res.status(200).json({
      msg: "Medicamentos con bajo stock",
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal Server Error",
      error: error.message,
    });
  }
};
