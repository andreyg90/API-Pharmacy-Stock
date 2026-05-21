import { Router } from "express";
import {
  createBatch,
  deleteBatches,
  getBatch,
  getBatches,
  putBatches,
} from "../controllers/batch.controller";

const router = Router();

router.get("/", getBatches);
router.get("/:batchNumber", getBatch);
router.post("/", createBatch);
router.put("/:batchNumber", putBatches);
router.delete("/:batchNumber", deleteBatches);

export default router;
