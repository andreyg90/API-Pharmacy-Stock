import mongoose from "mongoose";

//Función de conexión a Mongoose

const conectarBD = async()=>{

    try {

        // conexión hacia mongoose

        await mongoose.connect(process.env.MONGODB_CNN)
        console.log('Base de Datos en línea')
        
    } catch (error) {

        throw new Error('Error al iniciar la Base de Datos');
    }

}

export default conectarBD;