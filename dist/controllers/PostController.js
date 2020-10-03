"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Post = _interopRequireDefault(require("../models/Post"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  async store(req, res) {
    const image = req.file.filename;
    const {
      description
    } = req.body;
    const {
      user
    } = res.locals;

    try {
      const post = await _Post.default.create({
        owner: user,
        image,
        description
      });

      if (post) {
        console.log('Novo post criado com sucesso.', post);
        return res.status(201).send({
          message: 'success',
          post
        });
      }
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao criar um novo post, por favor revise o request.'
      });
    }
  },

  async getAll(req, res) {
    try {
      const {
        query,
        page,
        limit
      } = req.query;
      const skip = Number(limit) * (Number(page) - 1);
      const posts = await _Post.default.find().sort({
        [query === 'votes' ? 'likes' : 'createdAt']: -1
      }).skip(skip).limit(Number(limit));
      console.log('Retornando todos posts criados.', posts);
      return res.status(200).send({
        message: 'success',
        posts
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao recuperar todos posts, por favor revise o request.'
      });
    }
  },

  async getByUser(req, res) {
    const {
      user
    } = res.locals;
    const {
      page,
      limit
    } = req.query;
    const skip = Number(limit) * (Number(page) - 1);

    try {
      const posts = await _Post.default.find({
        owner: user
      }).skip(skip).limit(Number(limit));
      console.log(`Retornando todos posts do usuário ${user}.`, posts);
      return res.status(200).send({
        message: 'success',
        posts
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao recuperar todos posts, por favor revise o request.'
      });
    }
  },

  async update(req, res) {
    const image = req.file ? req.file.filename : null;
    const {
      description
    } = req.body;
    const {
      postId
    } = req.params;
    const {
      user
    } = res.locals;
    let update = {};
    if (image) update.image = image;
    if (description) update.description = description;

    try {
      let post = await _Post.default.update({
        owner: user,
        _id: postId
      }, update);
      post = await _Post.default.findById(postId);
      console.log(`Post atualizado com sucesso.`, post);
      return res.status(200).send({
        message: 'success',
        post
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao atualizar post, por favor revise o request.'
      });
    }
  },

  async addComment(req, res) {
    const {
      comment
    } = req.body;
    const {
      postId
    } = req.params;

    try {
      const post = await _Post.default.findOne({
        _id: postId
      });
      post.comments = [...post.comments, comment];
      post.save();
      console.log(`Comentário adicionado com sucesso.`, post);
      return res.status(200).send({
        message: 'success',
        post
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao adicionar comentário, por favor revise o request.'
      });
    }
  },

  async updateLike(req, res) {
    const {
      postId
    } = req.params;
    const {
      user
    } = res.locals;

    try {
      const user_document = await _User.default.findById(user);
      const post = await _Post.default.findOne({
        _id: postId
      });
      let message;

      if (user_document.likes.includes(postId)) {
        post.likes -= 1;
        let index = user_document.likes.indexOf(postId);
        user_document.likes.splice(index, 1);
        message = 'Deslike';
      } else {
        user_document.likes.push(postId);
        post.likes += 1;
        message = 'Like';
      }

      user_document.save();
      post.save();
      console.log(`${message} adicionado com sucesso.`, post);
      return res.status(200).send({
        message,
        post
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao adicionar deslike/like, por favor revise o request.'
      });
    }
  },

  async delete(req, res) {
    const {
      postId
    } = req.params;
    const {
      user
    } = res.locals;

    try {
      const post = await _Post.default.findOneAndDelete({
        owner: user,
        _id: postId
      });
      console.log(`Post deletado com sucesso.`, post);
      return res.status(200).send({
        message: 'Post deletado com sucesso.',
        post
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao deletar post, por favor revise o request.'
      });
    }
  }

};
exports.default = _default;