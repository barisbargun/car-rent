import {
  DRIVE_TRAIN_LIST,
  Vehicle,
  WHEEL_DRIVE_LIST,
} from '@repo/api/paths/vehicle/common'
import { model, Schema } from 'mongoose'

import { ConvertFieldsToObjectId } from '@/lib/utils'

type Type = ConvertFieldsToObjectId<Vehicle, 'img' | 'menubarVehicle'>

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
    menubarVehicle: {
      type: Schema.Types.ObjectId,
      ref: 'Menubar_vehicle',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 50,
    },
    fuel: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 20,
    },
    drivetrain: {
      type: Number,
      required: true,
      enum: DRIVE_TRAIN_LIST,
    },
    wheel: {
      type: Number,
      required: true,
      enum: WHEEL_DRIVE_LIST,
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

export const modelVehicle = model('Vehicle', schema)
