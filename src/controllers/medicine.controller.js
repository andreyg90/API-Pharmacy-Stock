import medicineModel from "../models/medicine.model.js"

const Medicine = medicineModel;

export const getMedicine = (req,res)=>{

    res.status(200).json({

        msg:'Estoy en el get dentro del controller'
    })

}

export const getMedicines = async(req,res)=>{

   try {

    const medicines = await Medicine.find({status:true})

    res.status(200).json({

        msg:'Medicinas registradas',
        medicines
    })
    
   } catch (error) {

        res.status(500).json({
            msg:'Server Internal Error',
            error: error.message
        })
   }

}



/**
 * Crea un medicamento con las propiedades requeridas
 * 
 * @param {import('express').Request} req Express Response
 * @param {import('express')Response} res Express Response
 * @returns {Promise<void>} Http Response
 */
export const createMedicine = async(req,res)=>{

    try {

        const {name,description,price,stock,type,entryDate,expirationDate,status}= req.body;
        const medicineExist = await Medicine.findOne({name:name});
        if(medicineExist){

            return res.status(404).json({

                msg:'Ya se encuentra un producto registrado con ese nombre'
            });
        }

        const medicine = new Medicine({name,description,price,stock,type,entryDate,expirationDate,status});
        await medicine.save();

        res.status(200).json({

            msg:'Se ha registrado correctamente el medicamento'
        });

    } catch (error) {
        
        res.status(500).json({

            msg:'Error interno del servidor',
            error: error.message
        })
    }
   

}

export const updateMedicine = (req,res)=>{

    res.status(200).json({

        msg:'actualizar medicines'
    })

}

export const deleteMedicine = (req,res)=>{

    res.status(200).json({

        msg:'delete medicines'
    })

}

