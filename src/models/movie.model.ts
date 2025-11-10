import mongoose from 'mongoose'
import { getThumbnailUrl } from '@/utils/helper'

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
      },
    ],
    theaters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theater',
      },
    ],
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
      default: 'default-movie.jpg',
    },
    price: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    bonus: {
      type: String,
    },
  },
  {
    timestamps: true,
    virtuals: {
      thumbnailUrl: {
        get() {
          return getThumbnailUrl('movies') + this.thumbnail
        },
      },
    },
    toJSON: {
      virtuals: true,
    },
  }
)

export default mongoose.model('Movie', movieSchema, 'movies')
