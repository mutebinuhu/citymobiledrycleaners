require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const dbConnection = require('./config/db/connection');
dbConnection();
const path = require('path')
const app = express();
app.set('view engine', 'hbs');
app.use(express.json({extended: false}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//routes
const requestRoute = require('./Routes/api/request');
const authRoutes = require('./Routes/Auth');

app.get('/demo', (req, res)=>{
    let demo = {
        name:"nuhu",
        age:20
    }
    let projects = {
        name : 'Rahul', 
        skills : ['Data Mining', 'BlockChain Dev', 'node.js']
    }
    res.json({projects})
})

//.use(requestRoute);
//app.use(authRoutes);
//api
app.use('/api/request', require('./Routes/api/request'));
app.use('/api/users/', require('./Routes/api/users'))

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server started at port" + process.env.PORT);
});