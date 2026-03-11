import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const validateJWT = async (req, res, next) => {
  try {
    const token = req.header("bearerToken");

    if (!token) {
      return res.status(401).json("No hay token en la petición");
    }

    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json("Error- usuario no encontrado");
    }

    if (!user.status) {
      return res.status(401).json("Error- usuario inactivo");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
