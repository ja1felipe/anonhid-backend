import app from './app'
import dotenv from 'dotenv'

dotenv.config()

app.listen(3333, () => {
  console.log('server funcionando na porta 3333')
})
