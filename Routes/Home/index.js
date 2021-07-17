const express = require('express');
const Router = express();
const {body, validationResult} = require('express-validator');
const auth = require('../../middleware/webCheckAuth')

Router.get('/', (req, res)=>{
    let currentUser = req.user;
    console.log(currentUser)
    res.render('index', {layout: false, currentUser});
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
   const {message, phone, date} = req.body;
console.log('date-----' + date);
   try {
    let request = new Request({
        message,
        phone,
        date
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
//show one request
Router.get('/requests/:id', async (req, res)=>{
   try{
    const request = await Request.findById(req.params.id).lean()
    res.render('requests/show', {request})
   } catch (err) {
console.log(err.message)
   }
})
Router.get('/home', async (req, res)=>{
    const currentUser = req.user;

    const requests = await Request.find().sort({date : 'desc'}).lean();
    const totalRequests = await Request.countDocuments();

   if(req.user){
    res.render('home', {requests, totalRequests})
   }else{
       res.render('index', {layout: false})
   }
});


module.exports = Router;