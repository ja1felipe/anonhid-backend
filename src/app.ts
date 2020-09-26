import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

mongoose
  .connect('mongodb://localhost:27017/anonhid', {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Mongo conectado com sucesso.')
  })

export default app
