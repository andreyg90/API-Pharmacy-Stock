import { generateJWT } from "../helpers/generateJWT.helper.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json("Usuario o contraseña incorrectos");
    }

    if (!user.status) {
      return res.status(400).json("Usuario inactivo, contar al administrador");
    }

    const validatePassword = bcryptjs.compareSync(password, user.password);

    if (!validatePassword) {
      return res.status(400).json("Usuario o contraseña incorrecta");
    }

    const token = await generateJWT(user._id);
    console.log(token);
    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Server Internal Error", error: error.message });
  }
};
