const express = require('express');
const Router = express();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const User = require('../../Models/User');
const {body, validationResult} = require('express-validator')


Router.get('/signup', async (req, res)=>{
    
    res.render('signup')
});
Router.post('/signup',
body('name', 'Name is required').not().isEmpty(),
body('email', 'Email required with minimum of 6 characters').isEmail(),
body('password', 'Password is required').not().isEmpty()
, async (req, res)=>{
    let errors = validationResult(req);
    const {name, email, password, confirm_password} = req.body;

    if(!errors.isEmpty()){
        let errorsList = errors.array()
        res.render('signup', {errorsList})
        console.log(errors)
    }
    if(confirm_password !== password){
        let confirmPasswordError = "Passwords Dont Match";
        res.render('signup', {confirmPasswordError})
    }else{
        try {
            let user = await User.findOne({email});
            if(user){
                let data = "User exists"
                res.render('signup', {data})
            }
           
     
            user = new User({
                name,
                email,
                password
            })
            let salt = await bcrypt.genSalt(10)
            user.password =  await bcrypt.hash(password, salt)
            await user.save()
     
         } catch (error) {
            console.log(error.message) 
         }
         res.render('signup')
    }
    
})

Router.get('/login', (req, res)=>{
    res.render('login')
});
module.exports = Router;