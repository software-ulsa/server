const jwt = require("jsonwebtoken");

// middleware to validate token (rutas protegidas)
const VerifyToken = (req: any, res: any, next: any) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next(); // continuamos
  } catch (error) {
    res.status(400).json({ error: "Token no es válido" });
  }
};

module.exports = VerifyToken;
