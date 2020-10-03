"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var nodemailer = _interopRequireWildcard(require("nodemailer"));

var _config = _interopRequireDefault(require("../config/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function sendMail(body) {
  const mailOptions = {
    from: _config.default.mail.user,
    to: body.to,
    subject: body.subject,
    text: body.text
  };
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: _config.default.mail.user,
      pass: _config.default.mail.password
    }
  });
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) return error;else console.log(`Email: ${body.subject} enviado com sucesso para ${body.to}`);
  });
}

var _default = {
  sendMail
};
exports.default = _default;