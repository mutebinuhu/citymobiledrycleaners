require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
//middleware
const checkAuth = require('./middleware/webCheckAuth')
app.use(cookieParser());
app.use(checkAuth)
//requiring express handlebars as a templating engine
const exphbs = require('express-handlebars');
//setting the main layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
const dbConnection = require('./config/db/connection');
dbConnection();
const path = require('path')
const corsOptions = {
    origin: 'http://localhost:5000'
}
app.use(cors(corsOptions));
//setting the app main layout 


app.use(express.json({extended: false}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//routes

const requestRoute = require('./Routes/api/request');
const HomeRoute = require('./Routes/Home');
const AuthRoute = require('./Routes/Auth');

app.use(AuthRoute);
app.use(HomeRoute);
app.use(requestRoute);




const authRoutes = require('./Routes/Auth');

app.get('/demo', (req, res)=>{
    let demo = {
        name:"nuhu",
        age:20
    }
    let projects = {
        name : 'Rahul', 
        skills : ['Data Mining', 'BlockChain Dev', 'node.js']
    }
    res.json({projects})
});


//.use(requestRoute);
//app.use(authRoutes);
//api
//app.use('/api/request', require('./Routes/api/request'));
//app.use('/api/users/', require('./Routes/api/users'));
//app.use('/api/auth/', require('./Routes/api/auth'));


app.listen(process.env.PORT || 3000, ()=>{
    console.log("server started at port" + process.env.PORT);
});