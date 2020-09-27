import { Schema, model, Document } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import validator from 'validator'
import config from '../config/config'

interface IUser extends Document {
  email: string
  password: string
  validated?: boolean
  generateToken: Function
  verificationToken?: string
  likes?: [String]
}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email: string) => {
          return validator.isEmail(email)
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
  },
  {
    timestamps: true
  }
)

UserSchema.methods.generateToken = function (expiresIn) {
  const user = this
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    config.tokenSecret,
    {
      expiresIn: expiresIn ? expiresIn : '24h'
    }
  )

  return token
}

UserSchema.pre<IUser>('save', async function (next) {
  const user = this
  if (this.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = model<IUser>('Users', UserSchema)

export default User
