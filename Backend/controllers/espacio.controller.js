const Espacio = require('../models/espacio.model');

// Crear un nuevo espacio
exports.crearEspacio = async (req, res) => {
  try {
    const espacio = new Espacio(req.body);
    await espacio.save();
    res.status(201).json(espacio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los espacios
exports.obtenerEspacios = async (req, res) => {
  try {
    const espacios = await Espacio.find();
    res.json(espacios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un espacio por ID
exports.obtenerEspacioPorId = async (req, res) => {
  try {
    const espacio = await Espacio.findById(req.params.id);
    if (!espacio) return res.status(404).json({ message: 'Espacio no encontrado' });
    res.json(espacio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un espacio
exports.actualizarEspacio = async (req, res) => {
  try {
    const espacio = await Espacio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!espacio) return res.status(404).json({ message: 'Espacio no encontrado' });
    res.json(espacio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un espacio
exports.eliminarEspacio = async (req, res) => {
  try {
    const espacio = await Espacio.findByIdAndDelete(req.params.id);
    if (!espacio) return res.status(404).json({ message: 'Espacio no encontrado' });
    res.json({ message: 'Espacio eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
