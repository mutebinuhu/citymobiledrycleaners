const mongoose = require('mongoose');
var moment = require('moment-timezone');
moment().tz("America/Los_Angeles").format();

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
        default: moment
    }
});
module.exports = Request = mongoose.model('request', RequestSechema)