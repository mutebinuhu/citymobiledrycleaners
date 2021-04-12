const express = require('express');
const Router = express();
const Request = require('../../Models/Request')
const {body, validationResult} = require('express-validator')
Router.post('/request',[
    body('phone', 'Invalid Phone').not().isEmpty().isLength({
        min:7,
        max:12,

    }).isMobilePhone()
],
 (req, res)=>{
     let errors = validationResult(req);
   if (!errors.isEmpty()) {
       res.status(400).json({errors:errors.array()})
   }
   const {phone, message} = req.body;
   let request = new Request({
       phone,
       message
   });
   request.save();
   res.status(200).json({data:request})
});
module.exports = Router;