const express = require('express')
const router = express.Router()
const tareaController = require('../controller/tarea.controller')
const { check } = require('express-validator')
const auth = require('../middleware/auth')

router.post(
  '/',
  auth,
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('proyectoId', 'El proyecto es obligatorio').not().isEmpty(),
  ],
  tareaController.create
)

router.get('/:proyectoId', auth, tareaController.index)

router.put(
  '/:id',
  auth,
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
  ],
  tareaController.update
)

router.delete('/:id', auth, tareaController.delete)

module.exports = router
