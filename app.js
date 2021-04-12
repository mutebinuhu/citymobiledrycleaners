require('dotenv').config();
const express = require('express');

const path = require('path')
const app = express();
app.use(express.json({extended: false}));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
//routes
const requestRoute = require('./Routes/api/sendrequest')
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.use(requestRoute);
app.listen(process.env.PORT || 3000, ()=>{
    console.log("server started at port" + process.env.PORT);
});