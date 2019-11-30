var mongoose=require("mongoose");

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/Booking-App');//to connect with the mongodb

module.exports={mongoose};