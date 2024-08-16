const Gasto = require('../models/gastoModel');
const Transaccion = require('../models/transaccionModel');
const Grupo = require('../models/grupoModel');
const Notificacion = require('../models/notificacionModel');

// Crear un nuevo gasto y generar transacciones para cada integrante del grupo
exports.createExpense = async (req, res) => {
  try {
    const { nombre, precio, grupoId, fechaVencimiento, usuarioCreador } = req.body;
    // Agregar log para verificar el grupoId recibido
    console.log('Buscando grupo con ID:', grupoId);

    // Verificar que el grupo existe
    const grupo = await Grupo.findById(grupoId).populate('integrantes');

    // Agregar log para verificar el resultado de la consulta
    console.log('Grupo encontrado:', grupo);

    if (!grupo) return res.status(404).json({ error: 'Grupo no encontrado' });

    // Crear el nuevo gasto
    const nuevoGasto = new Gasto({
      nombre,
      precio,
      usuarioCreador,
      grupo: grupo._id,
      fechaVencimiento,
    });
    await nuevoGasto.save();

    // Calcular el monto que debe pagar cada usuario
    const montoPorUsuario = precio / grupo.integrantes.length;

    // Crear una transacción y una notificación para cada integrante del grupo
    for (let usuario of grupo.integrantes) {
      // Verificar que el usuario es válido
      if (!usuario || !usuario._id) {
        console.error(`Usuario no válido: ${usuario}`);
        continue; // Pasar al siguiente usuario si hay un problema
      }

      // Crear la transacción
      const nuevaTransaccion = new Transaccion({
        monto: montoPorUsuario,
        fecha: new Date(),
        usuario: usuario._id,
        grupo: grupo._id,
        gasto: nuevoGasto._id,
        estado: 'pendiente',
      });
      await nuevaTransaccion.save();

      // Crear la notificación
      const mensaje = `Se ha registrado un nuevo gasto "${nombre}" en tu grupo. Debes pagar ${montoPorUsuario.toFixed(2)} antes del ${new Date(fechaVencimiento).toLocaleDateString()}.`;
      const notificacion = new Notificacion({
        usuario: usuario._id,
        mensaje,
      });
      await notificacion.save();

      console.log('Transacción y notificación creadas para el usuario:', usuario._id);
    }

    res.status(201).json({ message: 'Gasto creado y dividido exitosamente' });
  } catch (err) {
    console.error('Error creando el gasto:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los gastos
exports.getAllExpenses = async (req, res) => {
  try {
    const gastos = await Gasto.find().populate('grupo');
    res.status(200).json(gastos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un gasto por ID
exports.getExpenseById = async (req, res) => {
  try {
    const gasto = await Gasto.findById(req.params.id).populate('grupo');
    if (!gasto) return res.status(404).json({ error: 'Gasto no encontrado' });
    res.status(200).json(gasto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un gasto
exports.updateExpense = async (req, res) => {
  try {
    const { nombre, precio, grupo } = req.body;

    // Verificar que el grupo exista
    const grupoExistente = await Grupo.findById(grupo);
    if (!grupoExistente) {
      return res.status(400).json({ error: 'Grupo no encontrado' });
    }

    const gasto = await Gasto.findByIdAndUpdate(req.params.id, { nombre, precio, grupo }, { new: true }).populate('grupo');
    if (!gasto) return res.status(404).json({ error: 'Gasto no encontrado' });
    res.status(200).json({ message: 'Gasto actualizado exitosamente', gasto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un gasto
exports.deleteExpense = async (req, res) => {
  try {
    const gasto = await Gasto.findByIdAndDelete(req.params.id);
    if (!gasto) return res.status(404).json({ error: 'Gasto no encontrado' });
    res.status(200).json({ message: 'Gasto eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
