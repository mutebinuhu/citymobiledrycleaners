const mongoose = require('mongoose');
const RequestSechema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'

    },
    phone:{
        type:String,
        required:true,
        
    },
    message:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    }
});
module.exports = Request = mongoose.model('request', RequestSechema)