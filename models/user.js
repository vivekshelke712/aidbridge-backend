const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum:['user' , 'organization' ,]
    },
    Active: {
        type: Boolean,
        default:false,
    }
    

},{
    timestamps:true
})
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;

// module.exports = mongoose.model("user",userSchema)