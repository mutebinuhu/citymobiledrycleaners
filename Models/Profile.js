const mongoose = require('mongoose');
const ProfileSechema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user
    },
    phone:{
        type:Number
    }
})
module.exports = Profile = mongoose.model('profile', ProfileSechema)