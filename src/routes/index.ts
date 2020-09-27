import { Router } from 'express'
import auth from './auth'
import user from './user'
import post from './post'

const router = Router()

router.use('/auth', auth)
router.use('/user', user)
router.use('/post', post)

export default router
