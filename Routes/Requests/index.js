const express = require('express');
const Router = express();
const Request = require('../../Models/Request')
const path = require('path');
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
   //success message
   let successMessage = {
       success: true,
       message: "Request Sent" 
   }
   res.render('index', {successMessage})

});

//method GET
//description Gett all requests
//access private
Router.get('/requests',  async (req, res)=>{
    try {
        let requests = await Request.find();
        res.status(200).json(requests)
    } catch (error) {
        console.log(err.message)
        res.status(500).send("server error")
    }
})

module.exports = Router;