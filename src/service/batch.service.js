import Batch from "../models/batch.model.js";

export const createNewBatch = async (data) => {
  const newBatch = await Batch.create({ ...data });
  if (!newBatch) {
    throw new Error("Error creating the batch");
  }

  return newBatch;
};
