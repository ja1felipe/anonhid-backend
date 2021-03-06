"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _routes = _interopRequireDefault(require("./routes"));

var _path = _interopRequireDefault(require("path"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();

_dotenv.default.config();

_mongoose.default.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
}).then(() => {
  console.log('Mongo conectado com sucesso.');
});

app.use((0, _cors.default)());
app.use(_express.default.json());
app.use('/files', _express.default.static(_path.default.resolve(__dirname, 'assets', 'post_images')));
app.use(_routes.default);
var _default = app;
exports.default = _default;