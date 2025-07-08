import { SiteConfig } from '@repo/api/paths/site-config/common'
import { model, Schema } from 'mongoose'

import { ConvertFieldsToObjectId } from '@/lib/utils'

type Type = ConvertFieldsToObjectId<SiteConfig, 'logoImg' | 'serviceImg'>

const schema = new Schema<Type>(
  {
    logoImg: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
    },
    serviceImg: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
    },
    title: {
      type: String,
      trim: true,
      maxLength: 50,
    },
    desc: {
      type: String,
      trim: true,
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

export const modelSiteConfig = model('Site_config', schema)
