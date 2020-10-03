"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _AuthController = _interopRequireDefault(require("../controllers/AuthController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.post('/', _AuthController.default.login);
router.post('/validate/:token', _AuthController.default.validate);
var _default = router;
exports.default = _default;