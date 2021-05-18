const express = require('express');
const Router = express();
const auth = require('../../middleware/auth');
const User = require('../../Models/User')
Router.get('/', auth, async (req, res)=>{
   try {
       const user = await User.findById(req.user.id).select('-password')
       res.status(200).json(user)
   } catch (err) {
       console.log(err.message)
   }
});
module.exports = Router;