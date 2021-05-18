const express = require('express');
const Router = express();
const Request = require('../../Models/Request')
const {body, validationResult} = require('express-validator')

//method POST
//description stores a new request
//access private
Router.post('/',[
    body('phone').not().isEmpty().withMessage('Phone number is required').isLength({
        min:7,
        max:12,

    }).withMessage('check phone characters').isMobilePhone().withMessage('Phone is invalid')
],
 async (req, res)=>{
     let errors = validationResult(req);
   if (!errors.isEmpty()) {
       let errorsList = errors.array();
       console.log(errorsList);
       res.status(400).json({errors:errorsList})
   }
   const {phone, message} = req.body;
   try {
    let request = new Request({
        phone,
        message
    });
   await request.save();
   res.status(200).json(request)

   } catch (err) {
       console.log(err.message)
   }
  
});

//method GET
//description Get all requests
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