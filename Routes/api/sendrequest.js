const express = require('express');
const Router = express();
const Request = require('../../Models/Request')
const path = require('path')

const {body, validationResult} = require('express-validator')
/*returns the website view*/
Router.get('/', (req, res)=>{
    let details = {
        name:"mutebi nuhu",
        age:"43"
    }
    res.render('index',{details} )
})
Router.post('/',[
    body('phone').not().isEmpty().withMessage('Phone number is required').isLength({
        min:7,
        max:12,

    }).withMessage('check phone characters').isMobilePhone().withMessage('Phone is invalid')
],
 (req, res)=>{
     let errors = validationResult(req);
   if (!errors.isEmpty()) {
       let errorsList = errors.array();
       console.log(errorsList);
       res.render('index', {errorsList})
   }
   const {phone, message} = req.body;
   let request = new Request({
       phone,
       message
   });
   request.save();
   res.render('index')


});

module.exports = Router;