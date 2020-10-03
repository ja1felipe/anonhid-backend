import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import routes from './routes'
import path from 'path'
import config from './config/config'
const app = express()

mongoose
  .connect(config.mongo_url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Mongo conectado com sucesso.')
  })

app.use(cors())
app.use(express.json())
app.use(
  '/files',
  express.static(path.resolve(__dirname, 'assets', 'post_images'))
)
app.use(routes)

export default app
