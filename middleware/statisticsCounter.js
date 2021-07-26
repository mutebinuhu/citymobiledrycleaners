const Request = require('../Models/Request');
const counter = async(req, res, next) =>{
	const totalRequests = await Request.countDocuments();
	req.totalRequests = totalRequests
	console.log("count me im a counter")
	next();
}
module.exports = counter;