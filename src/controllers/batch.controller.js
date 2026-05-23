import { createNewBatch } from "../service/batch.service.js";
import { catchAsync } from "../service/catchAsync.service.js";

export const getBatches = (req, res) => {};
export const getBatch = (req, res) => {};
export const createBatch = catchAsync(async (req, res) => {
  const batchCreated = await createNewBatch(req.body);
  res.status(200).json({
    msg: "Batch has been created successfully",
  });
});
export const putBatches = (req, res) => {};
export const deleteBatches = (req, res) => {};
