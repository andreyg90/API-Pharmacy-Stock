import medicineModel from "../models/medicine.model.js"

export const isMedicineById = async(id)=>{

   const medicine_exist = await medicineModel.findById(id)

   if(!medicine_exist){

        throw new Error("No existe ningún medicamento con ese id " + id);    
   }

   return true;

}

