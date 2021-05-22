const express = require('express');
const Router = express.Router();
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken')
const User = require('../../Models/User');
const config = require('config');


Router.post('/',[
body('name', 'Name is required').not().isEmpty(),
body('email', 'Email required with minimum of 6 characters').isEmail(),
body('password', 'Password is required').not().isEmpty(),
body('phone', 'Phone is required').not().isEmpty(),
],
async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(500).json({errors:errors.array()})
    }
    try {
        const {email, name, password, phone} = req.body;
        let user = await User.findOne({email})
        if(user){
            res.status(500).json({errors:[{msg:"User exists"}]})
        }
        //add a gravator
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        user = new User({
            name,
            email,
            password,
            phone,
            avatar
        })
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
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
       res.send("serverc error")
    }
});
module.exports = Router;
