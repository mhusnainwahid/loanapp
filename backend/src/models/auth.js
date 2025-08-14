import {model, Schema} from "mongoose"

const authSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type:String
    },
    password:{
        type: String
    },
    phoneNumber:{
        type: String
    },
    cnic:{
        type: String
    },
    imageUrl:{
        type:String
    },
    role:{
        type : String
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    verificationCode:{
        type: String
    },
    codeExpires:{
        type: Date
    }
})

const User = model('User',authSchema)
export default User