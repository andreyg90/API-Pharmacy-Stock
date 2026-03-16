import bcryptjs from "bcryptjs";

import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    // const users = await User.find({ status: true })

    const { from = 0, limit = 5 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query)
        .sort({ name: 1 })
        .skip(Number(from))
        .limit(Number(limit)),
    ]);

    res.status(200).json({
      total,

      from: Number(from),
      limit: Number(limit),
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
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, rol } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json("Usuario no encontrado");
    }
    const salt = bcryptjs.genSaltSync(10);

    user.password = bcryptjs.hashSync(password, salt);

    user.name = name;
    user.email = email;
    user.rol = rol;
    await user.save();

    res.status(200).json({
      msg: "Usuario actualizado correctamente",
      user,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json("Usuario no encontrado");
    }
    user.status = false;
    await user.save();
    res.status(200).json({
      msg: "Usuario eliminado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
