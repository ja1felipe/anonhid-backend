"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  storage: _multer.default.diskStorage({
    destination: _path.default.resolve(__dirname, '..', 'assets', 'post_images'),
    filename: (req, file, cb) => {
      const ext = _path.default.extname(file.originalname);

      const name = _path.default.basename(file.originalname, ext).trim().split(' ').join('-');

      cb(null, `${name}-${Date.now()}${ext}`);
    }
  })
};
exports.default = _default;