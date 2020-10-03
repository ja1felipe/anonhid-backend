"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  async login(req, res) {
    const {
      email,
      password
    } = req.body;

    if (!(email && password)) {
      return res.status(400).send({
        message: 'Por favor passe o usuário e a senha.'
      });
    }

    const user = await _User.default.findOne({
      email: email
    }).select('+password');

    if (!user) {
      return res.status(404).send({
        message: 'Usuário não encontrado.'
      });
    }

    if (!(await _bcryptjs.default.compare(password, user.password))) {
      return res.status(401).send({
        message: 'Senha inválida.'
      });
    }

    if (!user.validated) {
      return res.status(401).send({
        message: 'E-mail ainda não validado, por favor valide seu e-mail.'
      });
    }

    user.password = undefined;
    const token = user.generateToken();
    return res.send({
      user,
      token
    });
  },

  async validate(req, res) {
    const {
      token
    } = req.params;
    const user = await _User.default.findOneAndUpdate({
      verificationToken: token
    }, {
      validated: true
    });

    if (!user) {
      return res.status(400).send();
    }

    user.validated = true;
    const jwtToken = user.generateToken();
    return res.status(200).send({
      user,
      jwtToken
    });
  }

};
exports.default = _default;