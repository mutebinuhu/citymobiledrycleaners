const express = require('express');
const Router = express();

Router.get('/', (req, res)=>{
    res.render('index')
});
Router.post('/',
 async (req, res)=>{
     //let errors = validationResult(req);
   //if (!errors.isEmpty()) {
       //let errorsList = errors.array();
       //console.log(erro rsList);
       //res.status(400).json({errors:errorsList})
   //}
   const {message, phone} = req.body;
   try {
    let request = new Request({
        message,
        phone 
    });
   await request.save();
   res.render('index')
   } catch (err) {
       console.log(err.message)
   }
  
});

module.exports = Router;