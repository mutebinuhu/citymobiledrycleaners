const express = require('express');
const Router = express();
const {body, validationResult} = require('express-validator');
const auth = require('../../middleware/webCheckAuth')
Router.get('/', (req, res)=>{
    res.render('index', {layout: false});
});
Router.post('/request',auth,[body('phone', 'Phone Number is Required').not().isEmpty(), body('phone', 'Phone number should not be less than 10').isLength({min: 10}).trim().escape()],
 async (req, res)=>{
     let errors = validationResult(req);
    if (!errors.isEmpty()) {
       let errorsList = errors.array();
       res.render('index',{
           errors: errorsList,
           layout: false
       })
   }
   const {message, phone} = req.body;
   try {
    let request = new Request({
        message,
        phone 
    });
   await request.save();
   res.render('index', {
     data: true,
     layout: false 
   })
   } catch (err) {
       console.log(err.message)
   }
  
});
Router.get('/request',[body('phone', 'Phone Number is Required').not().isEmpty(), body('phone', 'Phone number should not be less than 10').isLength({min: 10}).trim().escape()],
 async (req, res)=>{
     let errors = validationResult(req);
    if (!errors.isEmpty()) {
       let errorsList = errors.array();
       res.render('index',{
           errors: errorsList,
           layout: false
       })
   }
   const {message, phone} = req.body;
   try {
    let request = new Request({
        message,
        phone 
    });
   await request.save();
   res.render('index', {
     data: true  
   , layout:false})
   } catch (err) {
       console.log(err.message)
   }
  
});

module.exports = Router;