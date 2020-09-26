import { Router } from 'express'
import Controler from '../controllers/UserController'
const router = Router()

router.post('/create', Controler.store)

export default router
