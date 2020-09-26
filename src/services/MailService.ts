import * as nodemailer from 'nodemailer'
import config from '../config/config'

interface IMailBody {
  from?: string
  to: string
  subject: string
  text: string
}

function sendMail(body: IMailBody): void {
  const mailOptions: IMailBody = {
    from: config.mail.mail,
    to: body.to,
    subject: body.subject,
    text: body.subject
  }

  const transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: false,
    auth: {
      user: config.mail.user,
      pass: config.mail.password
    },
    tls: { rejectUnauthorized: false }
  })

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) return error
    else
      console.log(`Email: ${body.subject} enviado com sucesso para ${body.to}`)
  })
}

export default {
  sendMail
}
