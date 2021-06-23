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
body('name', 'Name is required').trim()
.escape()
.not()
.isEmpty()
.withMessage('User name can not be empty!')
.bail()
.isLength({min: 3})
.withMessage('Minimum 3 characters required!')
.bail(),
body('email', 'Email required with minimum of 6 characters').trim().not().isEmpty().withMessage('Invalid Email Address').bail(),
body('password', 'Password is required').not().isEmpty()
, async (req, res)=>{
    let errors = validationResult(req);
    const {name, email, phone,  password, confirm_password} = req.body;

    if(!errors.isEmpty()){
        let errorsList = errors.array()
        res.render('signup', {errorsList})
        console.log(errorsList)
    }
    if(confirm_password !== password){
        res.render('signup', {errorsList:[{"msg":"Passwords dont match"}]})
        console.log("passwords dont match")
    }else{
        try {
            let user = await User.findOne({email});
            if(user){
                let userExistsError = "User exists"
                res.render('signup', {errorsList: [{"msg":"User already exists"}]})
            }
            user = new User({
                name,
                email,
                phone,
                password
            })
            let salt = await bcrypt.genSalt(10)
            user.password =  await bcrypt.hash(password, salt)
            await user.save()
     
         } catch (error) {
            console.log(error.message) 
         }
         res.render('signup', {success: "Account created"})
    }
    
})

Router.get('/login', (req, res)=>{
    res.render('login')
});
module.exports = Router;