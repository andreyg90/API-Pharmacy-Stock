import { Router } from "express";
import { handleInvoiceReversal } from "../controllers/creditNotes.controller.js";

const router = Router();

//router.get();
router.post("/:idInvoice", handleInvoiceReversal);

export default router;
