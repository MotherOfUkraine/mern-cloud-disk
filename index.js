const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require('./routes/auth.routes')
const corsMiddleware = require('./middleware/cors.middleware')

const app = express()
const PORT = config.get('PORT')

app.use(corsMiddleware)
app.use(express.json())
app.use('/api/auth', authRouter)

const start = async () => {
  try {
    await mongoose.connect(config.get('dbUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => {
      console.log('Server is started on Port', PORT)
    })
  } catch (err) {
    console.log(err.message)
  }
}

start()
