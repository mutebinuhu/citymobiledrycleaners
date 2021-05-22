const express = require('express');
const Router = express();
const Request = require('../../Models/Request');
const User = require('../../Models/User');

const {body, validationResult} = require('express-validator')
const auth = require('../../middleware/auth')

//method POST
//description stores a new request
//access private
Router.post('/',auth,
 async (req, res)=>{
     let errors = validationResult(req);
   if (!errors.isEmpty()) {
       let errorsList = errors.array();
       console.log(errorsList);
       res.status(400).json({errors:errorsList})
   }
   const {message} = req.body;
   try {
    const user = await User.findById(req.user.id).select('-password');
    let request = new Request({
        message,
        name: user.name,
        phone: user.phone,
        user: req.user.id
        
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
Router.get('/requests', auth, async (req, res)=>{
    try {
        let requests = await Request.find();
        res.status(200).json(requests)
    } catch (error) {
        console.log(err.message)
        res.status(500).send("server error")
    }
});

//method GET
//description Get a single requests
//access private
Router.get('/:id', auth,  async (req, res)=>{
    try {
        const request = await Request.findById(req.params.id);
        if(!request){
            res.status(404).json({msg: "Request not found"})
        }
        res.status(200).json(request)
        
    } catch (error) {
        console.log(err.message)
        res.status(500).send('Server error');
        if(err.kind === 'ObjectId'){
            res.status(404).json({msg: "Request not found"})
        }
    }
});
//method DELETE
//description update a single requests
//access private
Router.delete('/:id', auth, async (req, res)=>{
    try {
        const request = await Request.findById(req.params.id);
        if(!request){
            res.status(404).json({msg: "Request not found"})
        }
        if(request.user.toString() !== req.user.id){
            res.status(401).json({msg: 'An authorised'})
        }
        res.status(200).json(request)
        request.remove();
    } catch (err) {
        console.log(err.message)
        if(err.kind === 'ObjectId'){
            res.status(404).json({msg: "Request not found"})
        }
        res.status(500).send('Server error')

    }
});
module.exports = Router;
