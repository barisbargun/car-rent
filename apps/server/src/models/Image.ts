import { Image } from '@repo/api/paths/image/common'
import { model, Schema } from 'mongoose'

const schema = new Schema<Image>(
  {
    url: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 5,
      maxLength: 500,
    },
    publicId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 5,
      maxLength: 150,
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

export const modelImage = model('Image', schema)
