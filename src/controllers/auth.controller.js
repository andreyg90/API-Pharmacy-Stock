import User from "../models/user.model.js";

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json("Usuario o contraseña incorrectos");
    }
  } catch (error) {
    res.status(500).json("Server Internal Error");
  }
};
