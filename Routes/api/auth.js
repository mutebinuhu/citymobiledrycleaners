const express = require('express');
const Router = express();
const auth = require('../../middleware/auth');
const User = require('../../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
//create  token
Router.get('/', auth, async (req, res)=>{
   try {
       const user = await User.findById(req.user.id).select('-password')
       res.status(200).json(user)
   } catch (err) {
       console.log(err.message)
       res.status(500).send("Server Error");
   }
});
//login
Router.post('/', async (req, res)=>{

    try {
        const {email, password} = req.body;
        let user = await User.findOne({email})
        if(!user){
            res.status(400).json({msg:"Invalid Credentials"})
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({msg:"Invalid Credentials"})
        }
         //create jwt payload
         const payLoad = {
            user:{
                id:user.id
            }
        }
        //sign the payload
        jwt.sign(
            payLoad,
            config.get('jwtToken'),
            {expiresIn:36000},
            (err, token)=>{
                if (err) throw err;
                res.status(200).json({token})
            }
        )

    } catch (err) {
        console.log(err.message)
        res.status(500).send("server error")
    }
})
module.exports = Router;