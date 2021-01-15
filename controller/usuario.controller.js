const Usuario = require('../model/Usuario')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.crearUsuario = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors,
    })
  }

  const { email, password } = req.body

  try {
    let usuario = await Usuario.findOne({ email })

    if (usuario) {
      return res.status(400).json({
        message: 'Usuario ya registrado',
      })
    }

    usuario = new Usuario(req.body)

    const salt = await bcrypt.genSalt(10)

    usuario.password = await bcrypt.hash(usuario.password, salt)

    await usuario.save()

    const payload = {
      usuario: {
        id: usuario.id,
      },
    }

    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: 3600000,
    })

    return res.status(200).json({
      message: 'Usuario registrado',
      usuario,
      token,
    })
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      message: 'Error al registrar',
    })
  }
}
