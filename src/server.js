import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/medicine.routes.js';
import conectarBD from './config/db.connection.js';


dotenv.config();

const myRouter = router;


//Creamos la clase Server

class Server{

    constructor(){

        this.app = express();
        this.port =process.env.PORT
        this.path = '/api/medicines'


        this.db()

        this.middlewares()

        //Llamada a routes

        this.routes()
        
    }

    async db(){

        await conectarBD();

    }

    middlewares(){

        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){


       this.app.use(this.path,myRouter)
      
    }

    listen(){

        this.app.listen(this.port,()=>{

            console.log('Starting the server on port : ', this.port)
        })
    }

}

export default Server;