import { Carousel } from '@repo/api/paths/carousel/common'
import { model, Schema } from 'mongoose'

import { ConvertFieldsToObjectId } from '@/lib/utils'

type Type = ConvertFieldsToObjectId<Carousel, 'img'>

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
      trim: true,
      default: '',
      maxLength: 150,
    },
    desc: {
      type: String,
      trim: true,
      default: '',
      maxLength: 300,
    },
    vehicleName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 150,
    },
    engine: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 150,
    },
    power: {
      type: Number,
      required: true,
      min: 10,
      max: 10_000,
    },
    price: {
      type: Number,
      required: true,
      min: 10,
      max: 10_000,
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

export const modelCarousel = model('Carousel', schema)
