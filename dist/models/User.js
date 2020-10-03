"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _validator = _interopRequireDefault(require("validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = new _mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: email => {
        return _validator.default.isEmail(email);
      },
      message: 'Invalid e-mail address.'
    },
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  validated: {
    type: Boolean,
    default: false
  },
  verificationToken: {
    type: String,
    select: false
  },
  likes: {
    type: [String],
    ref: 'Post',
    default: []
  }
}, {
  timestamps: true
});

UserSchema.methods.generateToken = function (expiresIn) {
  const user = this;

  const token = _jsonwebtoken.default.sign({
    userId: user._id,
    email: user.email
  }, process.env.JWT_SECRET, {
    expiresIn: expiresIn ? expiresIn : '24h'
  });

  return token;
};

UserSchema.pre('save', async function (next) {
  const user = this;

  if (this.isModified('password')) {
    user.password = await _bcryptjs.default.hash(user.password, 8);
  }

  next();
});
const User = (0, _mongoose.model)('Users', UserSchema);
var _default = User;
exports.default = _default;