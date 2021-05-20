const mongoose = require('mongoose');
const ProfileSechema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user
    },
    location:{
        type: String
    }
});
module.exports = Profile = mongoose.model('profile', ProfileSechema);