const Invitacion = require('../models/invitacionModel');
const Grupo = require('../models/grupoModel');
const Usuario = require('../models/usuarioModel');
const Notificacion = require('../models/notificacionModel');

exports.sendInvitation = async (req, res) => {
  try {
    const { usuarioId, grupoId } = req.body;

    const grupo = await Grupo.findById(grupoId);
    if (!grupo) return res.status(404).json({ error: 'Grupo no encontrado' });

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const invitacionExistente = await Invitacion.findOne({ usuario: usuarioId, grupo: grupoId });
    if (invitacionExistente) return res.status(400).json({ error: 'Ya existe una invitación pendiente para este usuario' });

    const nuevaInvitacion = new Invitacion({ usuario: usuarioId, grupo: grupoId });
    const invitacion = await nuevaInvitacion.save();

    // Crear notificación para el usuario invitado
    const mensaje = `Has recibido una invitación para unirte al grupo "${grupo.nombre}".`;
    const notificacion = new Notificacion({ usuario: usuarioId, mensaje });
    await notificacion.save();

    res.status(201).json({ message: 'Invitación enviada exitosamente', invitacion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getInvitationsByUser = async (req, res) => {
  try {
    const invitaciones = await Invitacion.find({ usuario: req.params.usuarioId }).populate('grupo');
    res.status(200).json(invitaciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.respondToInvitation = async (req, res) => {
  try {
    const invitacionId = req.params.id;
    const { estado } = req.body;

    const invitacion = await Invitacion.findById(invitacionId);
    if (!invitacion) return res.status(404).json({ error: 'Invitación no encontrada' });

    if (invitacion.estado !== 'pendiente') {
      return res.status(400).json({ error: 'La invitación ya ha sido respondida' });
    }

    invitacion.estado = estado;
    invitacion.fechaRespuesta = new Date();
    await invitacion.save();

    // Si la invitación fue aceptada, agregar al usuario al grupo
    if (estado === 'aceptada') {
      const grupo = await Grupo.findById(invitacion.grupo);
      if (grupo) {
        grupo.integrantes.push(invitacion.usuario);
        await grupo.save();

        // Crear una notificación para el usuario que ha aceptado
        const mensaje = `Te has unido al grupo "${grupo.nombre}" exitosamente.`;
        const notificacion = new Notificacion({ usuario: invitacion.usuario, mensaje });
        await notificacion.save();
      }
    }

    res.status(200).json({ message: 'Respuesta a la invitación registrada exitosamente', invitacion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
