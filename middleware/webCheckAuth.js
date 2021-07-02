const jwt = require('jsonwebtoken');
const checkAuth = (req, res, next) =>{
    console.log("checking auth middleware")
    if(typeof req.cookies.pToken === 'undefined' || req.cookies.pToken === null){
        req.user = null
    }else{
        const token = req.cookies.pToken;
        const decodedToken = jwt.decode(token, {complete : true}) || {};
        req.user = decodedToken.payload;
    }
    next();
}
module.exports =checkAuth;