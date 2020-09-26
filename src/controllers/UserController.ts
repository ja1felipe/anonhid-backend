import { Request, Response } from 'express'
import config from '../config/config'
import User from '../models/User'
import MailService from '../services/MailService'
import { fromString } from 'uuidv4'

export default {
  async store(req: Request, res: Response) {
    const { email, password } = req.body

    try {
      const verificationToken = fromString(email)

      const user = await User.create({ email, password, verificationToken })

      MailService.sendMail({
        to: email,
        subject: 'Confirme seu cadastro',
        text: `Olá, \n\nPor favor, confirme seu email pelo link: \n\n ${config.front_url}/validate/${verificationToken}`
      })
      console.log('Usuário ' + user.email + ' criado com sucesso.')
      return res.status(201).send({ user })
    } catch (error) {
      if (error.code == 11000) {
        return res
          .status(500)
          .send({ error: 'Já existe um usuário cadastrado com esse e-mail' })
      } else {
        return res
          .status(500)
          .send({
            error:
              'Erro interno do sistema, por favor verifique o corpo da requesição'
          })
      }
    }
  }
}
