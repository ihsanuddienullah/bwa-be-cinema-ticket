import mongoose from 'mongoose'

const connectToDatabase = async () => {
  const DATABASE_URL = process.env.DATABASE_URL || ''

  try {
    await mongoose.connect(DATABASE_URL)
    console.log('Database connected')
  } catch (error) {
    console.log(error)
  }

  const dbConn = mongoose.connection

  dbConn.on('open', () => {
    console.log('Database connected successfully on ', DATABASE_URL)
  })
}

export default connectToDatabase
