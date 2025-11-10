import mongoose from 'mongoose'
import { getThumbnailUrl } from '@/utils/helper'
import { GenreModel, TheaterModel } from '.'

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

movieSchema.post('save', async (doc) => {
  if (doc) {
    for (const genre of doc.genres) {
      await GenreModel.findByIdAndUpdate(genre, {
        $push: { movies: doc._id },
      })
    }

    for (const theater of doc.theaters) {
      await TheaterModel.findByIdAndUpdate(theater, {
        $push: { movies: doc._id },
      })
    }
  }
})

movieSchema.post('findOneAndDelete', async (doc) => {
  if (doc) {
    for (const genre of doc.genres) {
      await GenreModel.findByIdAndUpdate(genre, {
        $pull: { movies: doc._id },
      })
    }

    for (const theater of doc.theaters) {
      await TheaterModel.findByIdAndUpdate(theater, {
        $pull: { movies: doc._id },
      })
    }
  }
})

export default mongoose.model('Movie', movieSchema, 'movies')
