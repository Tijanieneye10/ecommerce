import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB connected to ${conn.connection.host}`.yellow.bold)
    } catch (err) {
        console.error(`Error ${err}`.red.bold)
        process.exit(1)
    }
}

export default connectDB