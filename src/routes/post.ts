import { Router } from 'express'
import multer from 'multer'
import Controler from '../controllers/PostController'
import { auth } from '../middlewares/auth'
import uploadConfig from '../middlewares/upload'

const router = Router()
const upload = multer(uploadConfig)

router.post('/create', [auth, upload.single('image')], Controler.store)

export default router
