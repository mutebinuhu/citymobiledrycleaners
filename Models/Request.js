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
    date:{
        type: Date,
        default: Date.now()
    }
});
module.exports = Request = mongoose.model('request', RequestSechema)