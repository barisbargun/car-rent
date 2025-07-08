import { ROLE_LIST, User } from '@repo/api/paths/user/common'
import { model, Schema } from 'mongoose'

import { ConvertFieldsToObjectId } from '../lib/utils'

type Type = ConvertFieldsToObjectId<User, 'img'>

const schema = new Schema<Type>(
  {
    img: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      select: false,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Please fill a valid email address',
      ],
    },
    role: {
      type: Number,
      required: true,
      enum: ROLE_LIST,
      default: ROLE_LIST.USER,
    },
    refreshToken: {
      type: String,
      select: false,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: function (_doc, ret) {
        delete ret._id
      },
    },
  },
)

export const modelUser = model('User', schema)
