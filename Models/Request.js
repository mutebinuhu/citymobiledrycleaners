const mongoose = require('mongoose');
var moment = require('moment-timezone');
moment().tz("Africa/Kampala").format();

const RequestSechema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
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
                type: String
            },
        }
    ],
    date:{
        type: String
    }
});
module.exports = Request = mongoose.model('request', RequestSechema)