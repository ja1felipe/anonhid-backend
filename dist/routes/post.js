"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _PostController = _interopRequireDefault(require("../controllers/PostController"));

var _auth = require("../middlewares/auth");

var _upload = _interopRequireDefault(require("../middlewares/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
const upload = (0, _multer.default)(_upload.default);
router.get('/', _PostController.default.getAll);
router.post('/', [_auth.auth, upload.single('image')], _PostController.default.store);
router.put('/:postId', [_auth.auth, upload.single('image')], _PostController.default.update);
router.delete('/:postId', _auth.auth, _PostController.default.delete);
router.get('/like/:postId', _auth.auth, _PostController.default.updateLike);
router.post('/commentary/:postId', _auth.auth, _PostController.default.addComment);
router.get('/user', _auth.auth, _PostController.default.getByUser);
var _default = router;
exports.default = _default;