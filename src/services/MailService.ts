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
    from: config.mail.user,
    to: body.to,
    subject: body.subject,
    text: body.text
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: config.mail.user,
      pass: config.mail.password
    }
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
