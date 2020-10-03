import * as nodemailer from 'nodemailer'

interface IMailBody {
  from?: string
  to: string
  subject: string
  text: string
}

function sendMail(body: IMailBody): void {
  const mailOptions: IMailBody = {
    from: process.env.MAIL_USER,
    to: body.to,
    subject: body.subject,
    text: body.text
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
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
