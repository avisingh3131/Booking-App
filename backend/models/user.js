
var mongoose=require("mongoose");

var User= mongoose.model('User',{
    
    userName:{type:String},
    userEmail:{type:String},
    password:{type:String}
});



module.exports={User};