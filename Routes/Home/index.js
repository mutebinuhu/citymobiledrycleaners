const express = require('express');
const Router = express();
const {body, validationResult} = require('express-validator');
const auth = require('../../middleware/webCheckAuth');
const counter = require('../../middleware/statisticsCounter');


Router.get('/', (req, res)=>{
    let currentUser = req.user;
    console.log(currentUser)
    res.render('index', {layout: false, currentUser});
});
Router.post('/request',[body('phone', 'Phone Number is Required').not().isEmpty(), body('dateInSeconds', 'dateInSeconds is Required').not().isEmpty(), body('phone', 'Phone number should not be less than 10').isLength({min: 10}).trim().escape()],
 async (req, res)=>{
     const userId = req.user
     let errors = validationResult(req);
    if (!errors.isEmpty()) {
       let errorsList = errors.array();
       res.render('index',{
           errors: errorsList,
           layout: false
       })
   }
   const {message, phone, date, status, dateInSeconds} = req.body;
   console.log("nodejs date---", date)
   try {
    let request = new Request({
        message,
        phone,
        date,
        dateInSeconds
    });
    request.status.unshift({
        requestDateStatus: date,
        requestStatus: "Pending"
    })
    //add the request status
   await request.save();
   res.render('index', {
     data: true,
     layout: false 
   })
   } catch (err) {
       console.log(err.message)
   }
});
Router.get('/request', counter,[body('phone', 'Phone Number is Required').not().isEmpty(), body('phone', 'Phone number should not be less than 10').isLength({min: 10}).trim().escape()],
 async (req, res)=>{
     let errors = validationResult(req);
    if (!errors.isEmpty()) {
       let errorsList = errors.array();
       res.render('index',{
           errors: errorsList,
           layout: false
       })
   }
   const {message, phone,date,dateInSeconds} = req.body;
   try {
    let request = new Request({
        message,
        phone,
        date,
        dateInSeconds
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
Router.get('/requests/:id',counter,auth, async (req, res)=>{
   try{
    const request = await Request.findById(req.params.id).lean();
    const totalRequests = req.totalRequests;

    res.render('requests/show', {request, totalRequests})
   } catch (err) {
console.log(err.message)
   }
});
//Approve request
Router.post('/request/approve',auth, async(req, res)=>{
    try{
        const reqId = req.body.requestid;
        const {requestStatus, date} = req.body;
        const newStatus = {requestStatus}
        const request = await Request.findById(reqId);
        request.status.unshift(newStatus);
        await request.save();
        res.redirect(`/requests/${reqId}`);
    }catch(err){
        console.log(err.message)
    }
});
//Assign request
Router.post('/request/assign', auth, body('assignedto', 'Assigned To name is required').not().isEmpty(), async(req, res)=>{

    try{
         let errors = validationResult(req);
        if(!errors.isEmpty()){
        let arraysList = errors.array();
        res.json({arraysList}).status('400')
        }
        let {assignedto, requestid} = req.body;
        let getRequest = await Request.findById(requestid);
        getRequest.assignedTo = assignedto;
        await getRequest.save();
        res.redirect(`/requests/${requestid}`);

    }catch(err){
        console.log(err.message)
    }
})
Router.get('/home',counter, async(req, res)=>{
   try{
     const currentUser = req.user;
    const totalRequests = req.totalRequests;
    const requests = await Request.find().sort({dateInSeconds : 'desc'}).lean();
    console.log("why undefined", requests[0]._id)
    let list;
    let getDate;
    let theDate;
    let dateToSeconds;


    //looping through the list and getting the date
    /*requests.forEach((request)=>{
        //turn the date into an array
        let list = request.date.split(" ");
        //select a few data from the date string
        let getDate = `${list[0]} ${list[1]} ${list[2]} ${list[3]} ${list[4]}`;
        let theDate = new Date(getDate);
        //turn the selected data into into seconds
        let dateToSeconds = theDate.getTime() / 1000;
        console.log(dateToSeconds + "--" + getDate)
    });
    */
   if(req.user){
    res.render('home', {requests, totalRequests})
   }else{
       res.render('index', {layout: false})
   }
   }catch(err){
    console.log(err.message)
   }
});



module.exports = Router;