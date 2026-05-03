import { Router } from "express";
import {
  handleInvoiceReversal,
  getCreditNotes,
  getCreditNote,
} from "../controllers/creditNotes.controller.js";

const router = Router();

//router.get();
router.post("/:idInvoice", handleInvoiceReversal);
router.get("/", getCreditNotes);
router.get("/:creditNumber", getCreditNote);

export default router;
