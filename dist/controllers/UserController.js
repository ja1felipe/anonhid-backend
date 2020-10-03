"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../config/config"));

var _User = _interopRequireDefault(require("../models/User"));

var _MailService = _interopRequireDefault(require("../services/MailService"));

var _uuidv = require("uuidv4");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  async store(req, res) {
    const {
      email,
      password
    } = req.body;

    if (!/^.{8,}/.test(password)) {
      return res.status(406).send({
        message: 'A senha deve conter no mínimo 8 caracteres'
      });
    }

    try {
      const verificationToken = (0, _uuidv.fromString)(email);
      const user = await _User.default.create({
        email,
        password,
        verificationToken
      });

      _MailService.default.sendMail({
        to: email,
        subject: 'Confirme seu cadastro',
        text: `Olá, \n\nPor favor, confirme seu email pelo link: \n\n ${_config.default.front_url}/validate/${verificationToken}`
      });

      console.log('Usuário ' + user.email + ' criado com sucesso.');
      return res.status(201).send({
        user
      });
    } catch (error) {
      if (error.code == 11000) {
        return res.status(500).send({
          message: 'Já existe um usuário cadastrado com esse e-mail'
        });
      } else if (error.errors.email) {
        return res.status(406).send({
          message: 'E-mail inválido.'
        });
      } else {
        return res.status(500).send({
          message: 'Erro interno do sistema, por favor verifique o corpo da requesição'
        });
      }
    }
  }

};
exports.default = _default;