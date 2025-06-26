import { MenubarVehicle } from '@repo/api/paths/menubar/vehicle/common'
import { model, Schema } from 'mongoose'

import { ConvertFieldsToObjectId } from '@/lib/utils'

type Type = ConvertFieldsToObjectId<MenubarVehicle, 'img' | 'menubarTab'>

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
    menubarTab: {
      type: Schema.Types.ObjectId,
      ref: 'Menubar_tab',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
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

export const modelMenubarVehicle = model('Menubar_vehicle', schema)
