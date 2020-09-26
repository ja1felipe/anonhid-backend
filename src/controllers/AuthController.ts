import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import User from '../models/User'

export default {
  async login(req: Request, res: Response) {
    const { username, password } = req.body
    if (!(username && password)) {
      return res.status(400).send()
    }

    const user = await User.findOne({ username: username }).select('+password')
    if (!user) {
      return res.status(400).send()
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).send()
    }

    if (!user.validated) {
      return res.status(401).send()
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

    const jwtToken = user.generateToken()

    return res.status(200).send({ user, jwtToken })
  }
}
