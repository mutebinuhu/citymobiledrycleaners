const express = require('express');
const Router = express();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const User = require('../../Models/User');
const Request = require('../../Models/Request');

const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require("config")


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
body('password', 'Password is required').not().isEmpty(),
body('phone', 'Name is required').trim()
.escape()
.not()
.isEmpty()
.withMessage('Phone can not be empty!')
.bail()
.isLength({min: 9})
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
Router.get('/admin', (req, res)=>{
    res.render('login', {layout: false})
})
Router.post('/admin', async (req, res)=>{
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if(!user){
            res.render('login', {error:"An error has occured", layout: false})
            
        }
        let isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            res.render('login', {error:"An error has occured", layout: false})
          }else{
           const payLoad = {
               user:{
                   id:user.id
               }
           }
           const requests = await Request.find().sort({date: "desc"}).limit(3).lean();

           jwt.sign(
            payLoad,
            config.get('jwtToken'),
            {expiresIn:36000},
            (err, token)=>{
                if (err) throw err;
                res.render("dashboard", {requests, layout: false})
            }
        )
          }
    //compare passwords

    
    } catch (error) {
        console.error(error.message)
    }
})
module.exports = Router;