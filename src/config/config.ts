export default {
  tokenSecret: process.env.JWT_SECRET,
  mail: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    mail: process.env.MAIL
  },
  front_url: process.env.FRONT_URL
}
