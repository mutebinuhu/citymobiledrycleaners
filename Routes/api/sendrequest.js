const express = require('express');
const Router = express();
const {body, validationResult} = require('express-validator')
Router.post('/request',[
    body('phone', 'Invalid Phone').not().isEmpty().isLength({
        min:7,
        max:12,

    })
],
 (req, res)=>{
     let errors = validationResult(req);
   if (!errors.isEmpty()) {
       res.status(400).json({errors:errors.array()})
   }
   const {phone, message} = req.body;
   console.log(req.body)
   res.send(req.body)
});
module.exports = Router;