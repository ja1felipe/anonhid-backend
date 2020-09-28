import { Router } from 'express'
import Controler from '../controllers/UserController'
const router = Router()

router.post('/', Controler.store)

export default router
