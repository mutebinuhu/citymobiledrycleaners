const express = require('express');
const Router = express();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const User = require('../../Models/User');
const Request = require('../../Models/Request');

const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require("config")



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
        res.render('signup', {errorsList, layout: false})
        console.log(errorsList)
    }
    if(confirm_password !== password){
        res.render('signup', {errorsList:[{"msg":"Passwords dont match"}], layout: false}, {layout: false})
        console.log("passwords dont match")
    }else{
        try {
            let user = await User.findOne({email});
            if(user){
                let userExistsError = "User exists"
                res.render('signup', {errorsList: [{"msg":"User already exists"}]}, {layout: false})
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
            const payLoad = {
                user:{
                    id:user.id
                }
            }
    
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });

         } catch (error) {
            console.log(error.message) 
         }
         res.render('signup', {success: "Account created"}, {layout: false})
    }
    
})

Router.get('/login', (req, res)=>{
    res.render('login', {layout: false})
});
/*Router.get('/admin', (req, res)=>{
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
                res.cookie('pToken', token, { maxAge: 900000, httpOnly: true });
                res.render("dashboard", {requests, layout: false})
            }
        )
          }
    //compare passwords

    
    } catch (error) {
        console.error(error.message)
    }
})
*/
Router.get('/register', (req, res)=>{
    res.render('signup', {layout: false})

});

Router.post('/register',
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
        res.render('signup', {errorsList, layout: false})
        console.log(errorsList)
    }
    if(confirm_password !== password){
        res.render('signup', {errorsList:[{"msg":"Passwords dont match"}], layout: false})
        console.log("passwords dont match")
    }else{
        try {
            let user = await User.findOne({email});
            if(user){
                let userExistsError = "User exists"
                res.render('signup', {errorsList: [{"msg":"User already exists"}], layout: false})
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
            const payLoad = {
                user:{
                    id:user.id
                }
            }
            
            
     
            const token = jwt.sign(
                payLoad,
                config.get('jwtToken'),
                {expiresIn:36000}
            );
            res.cookie('pToken', token, { maxAge: 900000, httpOnly: true });
            res.send("logged in")

         } catch (error) {
            console.log(error.message) 
         }
    }
    
});
//logout
Router.get('/logout', (req, res)=>{
    res.clearCookie('pToken');
    res.redirect('/')
})
module.exports = Router;