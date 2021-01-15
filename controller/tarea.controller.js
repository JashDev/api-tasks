const Proyecto = require('../model/Proyecto')
const Tarea = require('../model/Tarea')
const { validationResult } = require('express-validator')

exports.create = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors,
    })
  }

  const { proyectoId } = req.body

  try {
    const proyecto = await Proyecto.findById(proyectoId)

    if (!proyecto) {
      return res.status(400).json({
        message: 'Proyecto invalido',
      })
    }

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(400).json({
        message: 'No autorizado',
      })
    }

    const tarea = new Tarea(req.body)
    tarea.save()

    return res.status(200).json({
      message: 'Creado',
      tarea,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      error: error.message,
    })
  }
}

exports.index = async (req, res) => {
  const proyectoId = req.params.proyectoId

  try {
    const proyecto = await Proyecto.findById(proyectoId)

    if (!proyecto) {
      return res.status(400).json({
        message: 'Proyecto invalido',
      })
    }

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(400).json({
        message: 'No autorizado',
      })
    }

    const tareas = await Tarea.find({ proyectoId }).sort({
      creado: -1,
    })

    return res.status(200).json({
      tareas,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      error: error.message,
    })
  }
}

exports.update = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors,
    })
  }

  const { id } = req.params
  const { nombre, estado, proyectoId } = req.body

  try {
    const proyecto = await Proyecto.findById(proyectoId)

    if (!proyecto) {
      return res.status(400).json({
        message: 'Proyecto invalido',
      })
    }

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(400).json({
        message: 'No autorizado',
      })
    }

    let tarea = await Tarea.findById(id)

    if (!tarea) {
      return res.status(400).json({
        message: 'Tarea no existe',
      })
    }

    tarea = await Tarea.findByIdAndUpdate(
      { _id: id },
      {
        nombre,
        estado,
      },
      { new: true }
    )

    return res.status(200).json({
      message: 'Tarea actualizado',
      tarea,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      error: error.message,
    })
  }
}

exports.delete = async (req, res) => {
  const { id } = req.params

  try {
    let tarea = await Tarea.findById(id)

    if (!tarea) {
      return res.status(400).json({
        message: 'Tarea no existe',
      })
    }

    const proyecto = await Proyecto.findById(tarea.proyectoId)

    if (!proyecto) {
      return res.status(400).json({
        message: 'Proyecto invalido',
      })
    }

    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(400).json({
        message: 'No autorizado',
      })
    }

    tarea = await Tarea.findOneAndRemove({
      _id: id,
    })

    return res.status(200).json({
      message: 'Tarea Eliminado',
      tarea,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Error',
      error: error.message,
    })
  }
}
