import { FooterLink } from '@repo/api/paths/footer/link/common'
import { model, Schema } from 'mongoose'

import { ConvertFieldsToObjectId } from '@/lib/utils'

type Type = ConvertFieldsToObjectId<FooterLink, 'footerTitle'>

const schema = new Schema<Type>(
  {
    index: {
      type: Number,
      required: true,
    },
    footerTitle: {
      type: Schema.Types.ObjectId,
      ref: 'Footer_title',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    link: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 200,
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

export const modelFooterLink = model('Footer_link', schema)
