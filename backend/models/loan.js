import mongoose, { model, Schema, Types } from "mongoose";

const loanSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    loanType:{
        type: String,
        enum: ['home','education','business']
    },
    amount:{
        type: Number
    },
    tenure:{
        type: Number
    },
    cnic:{
        type: String
    },
    status:{
        type : String,
        enum: ['pending','approved','rejected'],
        default:'pending'
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})

const Loan = model('Loan',loanSchema)
export default Loan