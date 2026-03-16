import { Router } from "express";
import { check } from "express-validator";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { validateAdminRol } from "../middlewares/validateRol.middleware.js";
import { validateJWT } from "../middlewares/validateJWT.middleware.js";
import validateFields from "../middlewares/validateFields.middleware.js";
import { isUserById, isRolExist } from "../helpers/validators.helper.js";

const router = Router();

router.get("/", [validateJWT, validateAdminRol], getUsers);
router.get(
  "/:id",
  [
    validateJWT,
    validateAdminRol,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(isUserById),
  ],
  getUser,
);
router.post(
  "/",
  [
    validateJWT,
    validateAdminRol,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").not().isEmpty(),
    check("password", "Debe ingresar una contraseña").not().isEmpty(),
    check("rol", "El rol es obligatorio").not().isEmpty(),
    check("rol").custom(isRolExist),
    validateFields,
  ],
  createUser,
);
router.put(
  "/:id",
  [
    validateJWT,
    validateAdminRol,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(isUserById),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").not().isEmpty(),
    check("password", "Debe ingresar una contraseña").not().isEmpty(),
    check("rol", "El rol es obligatorio").not().isEmpty(),
    check("rol").custom(isRolExist),
    validateFields,
  ],
  updateUser,
);
router.delete(
  "/:id",
  [
    validateJWT,
    validateAdminRol,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(isUserById),
    validateFields,
  ],
  deleteUser,
);

export default router;
