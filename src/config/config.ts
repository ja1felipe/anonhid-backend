import dotenv from 'dotenv'

const result = dotenv.config()

if (result.error) {
  throw result.error
}

export default {
  tokenSecret: process.env.JWT_SECRET,
  mail: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD
  },
  front_url: process.env.FRONT_URL,
  mongo_url: process.env.MONGO_URL
}
