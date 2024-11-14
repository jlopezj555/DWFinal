//auth.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mysecretkey';


const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // guarda la información del usuario en la petición
    next();
  } catch (err) {
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

  
  const adminMiddleware = (req, res, next) => {
    if (req.user.rol !== 'administrador') {
      return res.status(403).json({ mensaje: 'Acceso denegado' });
    }
    next();
  };
  
  module.exports = { authMiddleware, adminMiddleware };