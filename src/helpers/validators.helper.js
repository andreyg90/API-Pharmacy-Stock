import Medicine from "../models/medicine.model.js";
import Invoice from "../models/invoice.model.js";
import User from "../models/user.model.js";

export const isMedicineById = async (id) => {
  const medicine_exist = await Medicine.findById(id);

  if (!medicine_exist) {
    throw new Error("No existe ningún medicamento con ese id " + id);
  }

  return true;
};

export const isInvoiceById = async (id) => {
  const invoice_exist = await Invoice.findById(id);

  if (!invoice_exist) {
    throw new Error("No existe ninguna factura relacionada con ese id");
  }

  return true;
};

export const isUserById = async (id) => {
  const user_exist = await User.findById(id);

  if (!user_exist) {
    throw new Error("No se encontró ningún usuario con ese id");
  }

  return true;
};

export const isRolExist = async (role) => {
  if (role != "seller" || role != "admin") {
    throw new Error("Rol no permitido, roles válidos: admin, seller");
  }

  return true;
};
