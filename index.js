const express = require('express')
const connect = require('./config/db')
const cors = require('cors')

const app = express()

connect()
app.use(cors())

const port = process.env.PORT || 4000

app.use(
  express.json({
    extended: true,
  })
)

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tarea'))

app.listen(port, '0.0.0.0', () => {
  console.log('Running')
})
