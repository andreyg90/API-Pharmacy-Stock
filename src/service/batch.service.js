import Batch from "../models/batch.model.js";

export const createNewBatch = async () => {

    const newBatch = await Batch.create({})
};
