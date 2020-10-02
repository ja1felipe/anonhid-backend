import { Request, Response } from 'express'
import User from '../models/User'
import Post from '../models/Post'

export default {
  async store(req: Request, res: Response) {
    const image = req.file.filename
    const { description } = req.body
    const { user } = res.locals

    try {
      const post = await Post.create({ owner: user, image, description })

      if (post) {
        console.log('Novo post criado com sucesso.', post)
        return res.status(201).send({ message: 'success', post })
      }
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao criar um novo post, por favor revise o request.'
      })
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const { query, page, limit } = req.query
      const skip = Number(limit) * (Number(page) - 1)
      const posts = await Post.find()
        .sort({
          [query === 'votes' ? 'likes' : 'createdAt']: -1
        })
        .skip(skip)
        .limit(Number(limit))

      console.log('Retornando todos posts criados.', posts)
      return res.status(200).send({ message: 'success', posts })
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao recuperar todos posts, por favor revise o request.'
      })
    }
  },

  async getByUser(req: Request, res: Response) {
    const { user } = res.locals
    const { page, limit } = req.query
    const skip = Number(limit) * (Number(page) - 1)
    try {
      const posts = await Post.find({ owner: user })
        .skip(skip)
        .limit(Number(limit))
      console.log(`Retornando todos posts do usuário ${user}.`, posts)
      return res.status(200).send({ message: 'success', posts })
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao recuperar todos posts, por favor revise o request.'
      })
    }
  },

  async update(req: Request, res: Response) {
    const { description } = req.body
    const { postId } = req.params
    const { user } = res.locals

    try {
      const post = await Post.findOneAndUpdate(
        { owner: user, _id: postId },
        { description: description }
      )
      post.description = description
      console.log(`Post atualizado com sucesso.`, post)
      return res.status(200).send({ message: 'success', post })
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao atualizar post, por favor revise o request.'
      })
    }
  },

  async addComment(req: Request, res: Response) {
    const { comment } = req.body
    const { postId } = req.params

    try {
      const post = await Post.findOne({ _id: postId })

      post.comments = [...post.comments, comment]
      post.save()

      console.log(`Comentário adicionado com sucesso.`, post)
      return res.status(200).send({ message: 'success', post })
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao adicionar comentário, por favor revise o request.'
      })
    }
  },

  async updateLike(req: Request, res: Response) {
    const { postId } = req.params
    const { user } = res.locals

    try {
      const user_document = await User.findById(user)
      const post = await Post.findOne({ _id: postId })

      let message: string

      if (user_document.likes.includes(postId)) {
        post.likes -= 1
        let index = user_document.likes.indexOf(postId)
        user_document.likes.splice(index, 1)
        message = 'Deslike'
      } else {
        user_document.likes.push(postId)
        post.likes += 1
        message = 'Like'
      }

      user_document.save()
      post.save()

      console.log(`${message} adicionado com sucesso.`, post)
      return res.status(200).send({ message, post })
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao adicionar deslike/like, por favor revise o request.'
      })
    }
  },

  async delete(req: Request, res: Response) {
    const { postId } = req.params
    const { user } = res.locals

    try {
      const post = await Post.findOneAndDelete({ owner: user, _id: postId })

      console.log(`Post deletado com sucesso.`, post)
      return res
        .status(200)
        .send({ message: 'Post deletado com sucesso.', post })
    } catch (error) {
      return res.status(500).send({
        message: 'Erro ao deletar post, por favor revise o request.'
      })
    }
  }
}
