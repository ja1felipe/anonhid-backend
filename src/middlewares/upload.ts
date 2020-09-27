import multer from 'multer'
import path from 'path'

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', 'assets', 'post_images'),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname)
      const name = path
        .basename(file.originalname, ext)
        .trim()
        .split(' ')
        .join('-')

      cb(null, `${name}-${Date.now()}${ext}`)
    }
  })
}
