"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = auth;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function auth(req, res, next) {
  const token = req.headers.authorization;
  let jwtPayload;

  try {
    jwtPayload = _jsonwebtoken.default.verify(token, process.env.JWT_SECRET);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send({
      message: 'Requisição não autorizada, por favor passe o token do usuário no header "Authorization".'
    });
    return;
  }

  const {
    userId,
    email
  } = jwtPayload;

  const newToken = _jsonwebtoken.default.sign({
    userId,
    email
  }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.locals.user = userId;
  res.setHeader('token', newToken);
  next();
}