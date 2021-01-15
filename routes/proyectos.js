const express = require('express')
const router = express.Router()
const proyectoController = require('../controller/proyecto.controller')
const { check } = require('express-validator')
const auth = require('../middleware/auth')

router.post(
  '/',
  auth,
  [check('nombre', 'El nombre es obligatorio').not().isEmpty()],
  proyectoController.create
)

router.get('/', auth, proyectoController.index)

router.put(
  '/:id',
  auth,
  [check('nombre', 'El nombre es obligatorio').not().isEmpty()],
  proyectoController.update
)

router.delete('/:id', auth, proyectoController.delete)

module.exports = router
