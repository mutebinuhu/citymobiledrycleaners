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
    status: [
        {
            requestStatus:{
                type: String
            },
            requestDateStatus:{
                type: Date,
                default: Date.now()
            },
        }
    ],
    date:{
        type: Date,
        default: Date
    }
});
module.exports = Request = mongoose.model('request', RequestSechema)