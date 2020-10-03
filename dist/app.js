"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _routes = _interopRequireDefault(require("./routes"));

var _path = _interopRequireDefault(require("path"));

var _config = _interopRequireDefault(require("./config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

_mongoose.default.connect(_config.default.mongo_url, {
  useNewUrlParser: true
}).then(() => {
  console.log('Mongo conectado com sucesso.');
});

app.use(_express.default.json());
app.use('/files', _express.default.static(_path.default.resolve(__dirname, 'assets', 'post_images')));
app.use(_routes.default);
var _default = app;
exports.default = _default;