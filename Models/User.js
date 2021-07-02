const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({

    name:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
    },
    avatar:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    },
    roles:[
        {
            
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        default: "normal"
    }
    ]
})
module.exports = User = mongoose.model('user', UserSchema)
