export const validateAdminRol = (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        msg: "Se requiere validar el token antes de verificar el rol ",
      });
    }

    if (req.user.rol != "admin") {
      return res.status(401).json({
        msg: "El usuario debe ser de tipo administrador",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
