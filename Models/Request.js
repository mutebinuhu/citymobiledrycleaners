const mongoose = require('mongoose');
const RequestSechema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    phone:{
        type: Number
    },
    name:{
        type: String
    },
    message:{
        type: String
    },
    status:{
       type: Boolean,
       default: 0
    
    },
    date:{
        type: Date,
        default: Date.now()
    }
});
module.exports = Request = mongoose.model('request', RequestSechema)