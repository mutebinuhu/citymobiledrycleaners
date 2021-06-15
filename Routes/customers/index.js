const express = require('express');
const Router = express();
const path = require('path');
Router.get('/customers', (req, res)=>{
    res.render('customers')
});
module.exports = Router;