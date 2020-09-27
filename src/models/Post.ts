import { Schema, model, Document } from 'mongoose'

interface IPost extends Document {
  owner: Schema.Types.ObjectId
  comments?: string[]
  likes?: number
  image: string
  description?: string
}

const PostSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
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
  },
  {
    timestamps: true
  }
)

PostSchema.virtual('image_url').get(function () {
  return 'http://localhost:3333/files/' + this.image
})

const Post = model<IPost>('Posts', PostSchema)

export default Post
