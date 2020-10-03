import { Request, Response } from 'express'
import User from '../models/User'
import MailService from '../services/MailService'
import { fromString } from 'uuidv4'

export default {
  async store(req: Request, res: Response) {
    const { email, password } = req.body

    if (!/^.{8,}/.test(password)) {
      return res
        .status(406)
        .send({ message: 'A senha deve conter no mínimo 8 caracteres' })
    }

    try {
      const verificationToken = fromString(email)

      const user = await User.create({ email, password, verificationToken })

      MailService.sendMail({
        to: email,
        subject: 'Confirme seu cadastro',
        text: `Olá, \n\nPor favor, confirme seu email pelo link: \n\n ${process.env.FRONT_URL}/validate/${verificationToken}`
      })
      console.log('Usuário ' + user.email + ' criado com sucesso.')
      return res.status(201).send({ user })
    } catch (error) {
      if (error.code == 11000) {
        return res
          .status(500)
          .send({ message: 'Já existe um usuário cadastrado com esse e-mail' })
      } else if (error.errors.email) {
        return res.status(406).send({ message: 'E-mail inválido.' })
      } else {
        return res.status(500).send({
          message:
            'Erro interno do sistema, por favor verifique o corpo da requesição'
        })
      }
    }
  }
}
