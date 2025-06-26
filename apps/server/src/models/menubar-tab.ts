import {
  MENUBAR_TAB_GRID_LIST,
  MenubarTab,
} from '@repo/api/paths/menubar/tab/common'
import { model, Schema } from 'mongoose'

const schema = new Schema<MenubarTab>(
  {
    index: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
    },
    type: {
      type: Number,
      required: true,
      enum: MENUBAR_TAB_GRID_LIST,
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

export const modelMenubarTab = model('Menubar_tab', schema)
