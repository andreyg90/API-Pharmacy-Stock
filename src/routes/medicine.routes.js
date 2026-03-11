import { Router } from "express";
import { check } from "express-validator";
import {
  getMedicine,
  getMedicines,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  sellMedicine,
  lowStockMedicine,
} from "../controllers/medicine.controller.js";
import { createSale } from "../controllers/invoice.controller.js";
import validateFields from "../middlewares/validateFields.middleware.js";
import { validateJWT } from "../middlewares/validateJWT.middleware.js";
import { validateAdminRol } from "../middlewares/validateRol.middleware.js";
import { isMedicineById } from "../helpers/validators.helper.js";
const router = Router();

router.get("/", getMedicines);
router.get("/alerts/low-stock", lowStockMedicine);
router.get(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(isMedicineById),
    validateFields,
  ],
  getMedicine,
);
router.post(
  "/",
  [
    validateJWT,
    validateAdminRol,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("description", "La descripción es obligatoria").not().isEmpty(),
    check("price", "El precio es obligatorio").not().isEmpty(),
    check("stock", "El stock es obligatorio").not().isEmpty(),
    check("type", "El tipo de medicamento es obligatorio").not().isEmpty(),
    check("entryDate", "La fecha de entrada es obligatoria").not().isEmpty(),
    check("expirationDate", "La fecha de vencimiento es obligatoria")
      .not()
      .isEmpty(),
    check("status", "El estado del medicamento es obligatorio").not().isEmpty(),
    validateFields,
  ],
  createMedicine,
);
router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(isMedicineById),
    validateFields,
  ],
  updateMedicine,
);
router.delete(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(isMedicineById),
    validateFields,
  ],
  deleteMedicine,
);
router.post(
  "/:id/sell",
  [
    check("id", "No es un id válido").isMongoId(),
    check("quantity", "La cantidad es obligatoria").not().isEmpty(),
    check("quantity")
      .isInt({ gt: 0 })
      .withMessage("La cantidad debe ser mayor a cero"),
    validateFields,
  ],
  sellMedicine,
);
router.post("/sale", createSale);

export default router;
