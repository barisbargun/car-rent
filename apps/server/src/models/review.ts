import { Review } from '@repo/api/paths/review/common'
import { model, Schema } from 'mongoose'

import { ConvertFieldsToObjectId } from '@/lib/utils'

type Type = ConvertFieldsToObjectId<Review, 'img'>

const schema = new Schema<Type>(
  {
    index: {
      type: Number,
      required: true,
    },
    img: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 5,
      maxLength: 150,
    },
    desc: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 20,
      maxLength: 300,
    },
    occupation: {
      type: String,
      trim: true,
      default: '',
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

export const modelReview = model('Review', schema)
