const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoUrl');
const connectDB = async () =>{
    try {
        mongoose.connect(db,  { useNewUrlParser: true,  useUnifiedTopology: true,   useCreateIndex: true});
        console.log('db connected')
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = connectDB;