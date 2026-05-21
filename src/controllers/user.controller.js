import bcryptjs from "bcryptjs";

import User from "../models/user.model.js";
import { catchAsync } from "../service/catchAsync.service.js";

export const getUsers = catchAsync(async (req, res) => {
  // const users = await User.find({ status: true })

  const { from = 0, limit = 5 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).sort({ name: 1 }).skip(Number(from)).limit(Number(limit)),
  ]);

  res.status(200).json({
    total,

    from: Number(from),
    limit: Number(limit),
    users,
  });
});
export const getUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.status(200).json({
    user,
  });
});
export const createUser = catchAsync(async (req, res) => {
  const { name, email, password, rol } = req.body;

  const user = new User({ name, email, password, rol });
  const salt = bcryptjs.genSaltSync(10);

  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.status(201).json({
    msg: "Usuario creado correctamente",
    user,
  });
});
export const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, email, password, rol } = req.body;

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
});
export const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json("Usuario no encontrado");
  }
  user.status = false;
  await user.save();
  res.status(200).json({
    msg: "Usuario eliminado correctamente",
  });
});
