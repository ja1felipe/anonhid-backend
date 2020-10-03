import { Router } from 'express'
import multer from 'multer'
import Controler from '../controllers/PostController'
import { auth } from '../middlewares/auth'
import uploadConfig from '../middlewares/upload'

const router = Router()
const upload = multer(uploadConfig)

router.get('/', Controler.getAll)
router.post('/', [auth, upload.single('image')], Controler.store)
router.put('/:postId', [auth, upload.single('image')], Controler.update)
router.delete('/:postId', auth, Controler.delete)
router.get('/like/:postId', auth, Controler.updateLike)
router.post('/commentary/:postId', auth, Controler.addComment)
router.get('/user', auth, Controler.getByUser)

export default router
