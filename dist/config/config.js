"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const result = _dotenv.default.config();

if (result.error) {
  throw result.error;
}

var _default = {
  tokenSecret: process.env.JWT_SECRET,
  mail: {
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD
  },
  front_url: process.env.FRONT_URL,
  mongo_url: process.env.MONGO_URL
};
exports.default = _default;