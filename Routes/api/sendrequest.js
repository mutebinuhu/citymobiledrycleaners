const express = require('express');
const Router = express();
const Request = require('../../Models/Request')
const path = require('path')

const {body, validationResult} = require('express-validator')
/*returns the website view*/

Router.post('/',[
    body('phone').not().isEmpty().withMessage('Phone number is required').isLength({
        min:7,
        max:12
    }).withMessage('check phone characters').isMobilePhone().withMessage('Phone is invalid')
],
 async (req, res)=>{
     let errors = validationResult(req);
   if (!errors.isEmpty()) {
       let errorsList = errors.array();
       console.log(errorsList);
       res.render('index', {errorsList})
   }
   const {phone, message} = req.body;
   try {

    let request = new Request({
        phone,
        message
    });
    await request.save();
    //success message
    let successMessage = {
        success: true,
        message: "Request Sent" 
    }
   } catch (err) {
       console.log(err.message)
   }

});

module.exports = Router;