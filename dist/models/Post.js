"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const PostSchema = new _mongoose.Schema({
  owner: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: {
    type: [String]
  },
  likes: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
  }
});
PostSchema.virtual('image_url').get(function () {
  return 'http://localhost:3333/files/' + this.image;
});
const Post = (0, _mongoose.model)('Posts', PostSchema);
var _default = Post;
exports.default = _default;