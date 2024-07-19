const Grupo = require('../models/grupoModel');
const Usuario = require('../models/usuarioModel');

exports.createGroup = async (req, res) => {
  try {
    const { nombre, descripcion, integrantes } = req.body;

    // Verifica que todos los integrantes existan en la base de datos
    const usuarios = await Usuario.find({ _id: { $in: integrantes } });
    if (usuarios.length !== integrantes.length) {
      return res.status(400).json({ error: 'Algunos usuarios no existen' });
    }

    const nuevoGrupo = new Grupo({
      nombre,
      descripcion,
      integrantes,
    });

    const grupo = await nuevoGrupo.save();
    const populatedGrupo = await Grupo.findById(grupo._id).populate('integrantes');
    res.status(201).json({ message: 'Grupo creado exitosamente', grupo: populatedGrupo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllGroups = async (req, res) => {
  try {
    const grupos = await Grupo.find().populate('integrantes', 'nombre');
    res.status(200).json(grupos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGroupById = async (req, res) => {
  try {
    const grupo = await Grupo.findById(req.params.id).populate('integrantes', 'nombre');
    if (!grupo) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.status(200).json(grupo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const { nombre, descripcion, integrantes } = req.body;

    // Verifica que todos los integrantes existan en la base de datos
    const usuarios = await Usuario.find({ _id: { $in: integrantes } });
    if (usuarios.length !== integrantes.length) {
      return res.status(400).json({ error: 'Algunos usuarios no existen' });
    }

    const grupo = await Grupo.findByIdAndUpdate(req.params.id, { nombre, descripcion, integrantes }, { new: true }).populate('integrantes', 'nombre');
    if (!grupo) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.status(200).json({ message: 'Grupo actualizado exitosamente', grupo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const grupo = await Grupo.findByIdAndDelete(req.params.id);
    if (!grupo) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.status(200).json({ message: 'Grupo eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
