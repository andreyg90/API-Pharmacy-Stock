import jwt from "jsonwebtoken";

export const generarJWT = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid: userId,
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          reject("Error al generar el token");
        } else {
          resolve(token);
        }
      },
    );
  });
};
