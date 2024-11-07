// usuario.controller.js

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');
const SECRET_KEY = 'mysecretkey';

// Autenticación (login)
exports.loginUsuario = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    // Buscar al usuario por correo electrónico
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Comparar las contraseñas
    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isMatch) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar un JWT con el rol
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Enviar el token, nombre y rol del usuario en la respuesta
    res.json({ token, nombre: usuario.nombre, rol: usuario.rol });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};




// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Encriptar la contraseña antes de guardarla
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    // Crear el nuevo usuario con la contraseña encriptada
    const usuario = new Usuario({ ...req.body, contraseña: hashedPassword });

    // Guardar el usuario en la base de datos
    await usuario.save();

    // Responder con el usuario creado (excluyendo la contraseña para seguridad)
    const { contraseña: _, ...usuarioSinContraseña } = usuario.toObject();
    res.status(201).json(usuarioSinContraseña);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};