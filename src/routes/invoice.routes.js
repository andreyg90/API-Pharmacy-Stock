import { Router } from "express";
import { check } from "express-validator";
import { getInvoices, getInvoice } from "../controllers/invoice.controller.js";
import { isInvoiceById } from "../helpers/validators.helper.js";
import validateFields from "../middlewares/validateFields.middleware.js";
const router = Router();

router.get("/", getInvoices);
router.get(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(isInvoiceById),
    validateFields,
  ],
  getInvoice,
);

export default router;
