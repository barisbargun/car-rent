import { FooterTitle } from '@repo/api/paths/footer/title/common'
import { model, Schema } from 'mongoose'

const schema = new Schema<FooterTitle>(
  {
    index: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
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

export const modelFooterTitle = model('Footer_title', schema)
