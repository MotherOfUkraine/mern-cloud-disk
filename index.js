const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()
const fileUpload = require("express-fileupload")
const authRouter = require("./routes/auth.routes")
const fileRouter = require("./routes/file.routes")
const app = express()
const PORT = process.env.PORT
const corsMiddleware = require('./middleware/cors.middleware')


app.use(corsMiddleware)
app.use(fileUpload({}))
app.use(express.json())
app.use("/api/auth", authRouter)
app.use('/api/files', fileRouter)


const start = async () => {
  try {
    await mongoose.connect(process.env.dbUrl, {
      useNewUrlParser:true,
      useUnifiedTopology:true
    })

    app.listen(PORT, () => {
      console.log('Server started on port ', PORT)
    })
  } catch (e) {
    console.log(e)
  }
}

start()