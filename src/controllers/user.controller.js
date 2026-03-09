import bcryptjs from "bcryptjs";

import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ status: true });

    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    //TODO: se debe quitar cuando implementemos los middlewares
    if (!user) {
      return res.status(400).json("Usuario no encontrado");
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
export const createUser = async (req, res) => {
  const { name, email, password, rol } = req.body;

  const user = new User({ name, email, password, rol });
  const salt = bcryptjs.genSaltSync(10);

  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(201).json({
    msg: "Usuario creado correctamente",
    user,
  });

  try {
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
export const updateUser = (req, res) => {};
export const deleteUser = (req, res) => {};
