import mongoose from 'mongoose'

const connectMongoDb = ()=>{
    try {
        const connectDb = mongoose.connect("mongodb+srv://mhusnainwahid:husnain@cluster0.mqnszt8.mongodb.net/")
        console.log("MongoDb is connect!")
    } catch (error) {
        console.log("MongoDb is not connect!")
    }
}

export default connectMongoDb