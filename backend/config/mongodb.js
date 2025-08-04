import mongoose from 'mongoose'

const connectMongoDb = ()=>{
    try {
        const connectDb = mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb is connect!")
    } catch (error) {
        console.log("MongoDb is not connect!")
    }
}

export default connectMongoDb