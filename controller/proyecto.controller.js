const Proyecto = require('../model/Proyecto')
const { validationResult } = require('express-validator')

exports.create = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors
        })
    }

    try {
        const proyecto = new Proyecto(req.body)
        proyecto.creador = req.usuario.id
        proyecto.save()
        
        return res.status(200).json({
            message: 'Creado',
            proyecto
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            error: error.message
        })
    }
}

exports.index = async (req, res) => {
    const userId = req.usuario.id

    try {
        const proyectos = await Proyecto.find({ creador: userId })
        .sort({
            creado: -1
        })

        return res.status(200).json({
            proyectos
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            error: error.message
        })
    }
}

exports.update = async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors
        })
    }

    const { id } = req.params
    const { nombre } = req.body

    try {
        let proyecto = await Proyecto.findById(id)

        if (!proyecto) {
            return res.status(400).json({
                message: 'Proyecto no existe',
            })
        }

        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(400).json({
                message: 'No autorizado',
            })
        }

        proyecto = await Proyecto.findByIdAndUpdate({ _id: id }, {
            nombre
        }, { new: true })

        return res.status(200).json({
            message: 'Proyecto actualizado',
            proyecto
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            error: error.message
        })
    }
}

exports.delete = async (req, res) => {
    const { id } = req.params

    try {
        let proyecto = await Proyecto.findById(id)

        if (!proyecto) {
            return res.status(400).json({
                message: 'Proyecto no existe',
            })
        }

        if (proyecto.creador.toString() !== req.usuario.id) {
            return res.status(400).json({
                message: 'No autorizado',
            })
        }

        proyecto = await Proyecto.findOneAndRemove({
            _id: id
        })

        return res.status(200).json({
            message: 'Proyecto Eliminado',
            proyecto
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error',
            error: error.message
        })
    }
}