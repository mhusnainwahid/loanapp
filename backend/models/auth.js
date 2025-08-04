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
    token:{
        type: String
    },
    role:{
        type : String
    }
})

const User = model('User',authSchema)
export default User