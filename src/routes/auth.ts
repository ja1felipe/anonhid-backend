import { Router } from 'express'
import AuthControler from '../controllers/AuthController'
const router = Router()

router.post('/', AuthControler.login)
router.post('/validate/:token', AuthControler.validate)

export default router
