import { Service } from '@repo/api/paths/service/common'
import { model, Schema } from 'mongoose'

import { ConvertFieldsToObjectId } from '@/lib/utils'

type Type = ConvertFieldsToObjectId<Service, 'img'>

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
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 50,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
      minLength: 20,
      maxLength: 300,
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

export const modelService = model('Service', schema)
