import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User'

export default {
  async login(req: Request, res: Response) {
    const { email, password } = req.body
    if (!(email && password)) {
      return res
        .status(400)
        .send({ message: 'Por favor passe o usuário e a senha.' })
    }

    const user = await User.findOne({ email: email }).select('+password')
    if (!user) {
      return res.status(404).send({ message: 'Usuário não encontrado.' })
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: 'Senha inválida.' })
    }

    if (!user.validated) {
      return res.status(401).send({
        message: 'E-mail ainda não validado, por favor valide seu e-mail.'
      })
    }
    user.password = undefined

    const token = user.generateToken()

    return res.send({ user, token })
  },

  async validate(req: Request, res: Response) {
    const { token } = req.params
    const user = await User.findOneAndUpdate(
      { verificationToken: token },
      { validated: true }
    )

    if (!user) {
      return res.status(400).send()
    }

    user.validated = true

    const jwtToken = user.generateToken()

    return res.status(200).send({ user, jwtToken })
  }
}
