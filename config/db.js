const mongoose = require('mongoose')

// Connect to MongoDB database usine env variable
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)

        // Output if connected, use Colors package in console
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB