import medicineModel from "../models/medicine.model.js";

export const  sellMedicineService =async (id,quantity)=>{

  
    const medicine = await medicineModel.findById(id);
    

    if(!medicine){

        throw new Error('No se encontró ningún medicamento con ese id')
    }

    if(medicine.stock !=0){

        if(quantity <=medicine.stock){

            let new_stock = (medicine.stock - quantity);
            medicine.stock = new_stock;
            await medicine.save();


        }else{

            throw new Error ('La cantidad debe ser menor o igual al stock del medicamento')
        }


    }else{

        throw new Error('No hay suficiente stock para realizar la compra')
    }

  return {msg:'Se ha realizado la venta con éxito',medicine:medicine};

}

export const getLowStackMedicines = async()=>{

    

    return await medicineModel.find({stock:{$lte:3}})

}

