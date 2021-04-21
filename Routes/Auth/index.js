const express = require('express');
const Router = express();
Router.get('/signup', (req, res)=>{
    res.render('signup')
});
Router.get('/login', (req, res)=>{
    res.render('login')
});
module.exports = Router;