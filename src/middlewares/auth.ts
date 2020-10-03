import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization

  let jwtPayload

  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET)
    res.locals.jwtPayload = jwtPayload
  } catch (error) {
    res.status(401).send({
      message:
        'Requisição não autorizada, por favor passe o token do usuário no header "Authorization".'
    })
    return
  }

  const { userId, email } = jwtPayload

  const newToken = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })

  res.locals.user = userId

  res.setHeader('token', newToken)

  next()
}
