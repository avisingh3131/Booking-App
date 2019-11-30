
var mongoose=require("mongoose");

var Note= mongoose.model('Note',{
    
    title:{type:String},
    description:{type:String}
});



module.exports={Note};