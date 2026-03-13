import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import medicineRouter from "./routes/medicine.routes.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import invoiceRouter from "./routes/invoice.routes.js";
import conectarBD from "./config/db.connection.js";

dotenv.config();

//Creamos la clase Server

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.path = {
      medicine: "/api/medicines",
      user: "/api/users",
      auth: "/api/auth",
      invoice: "/api/invoices",
    };

    this.db();

    this.middlewares();

    //Llamada a routes

    this.routes();
  }

  async db() {
    await conectarBD();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.path.medicine, medicineRouter);
    this.app.use(this.path.user, userRouter);
    this.app.use(this.path.auth, authRouter);
    this.app.use(this.path.invoice, invoiceRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Starting the server on port : ", this.port);
    });
  }
}

export default Server;
