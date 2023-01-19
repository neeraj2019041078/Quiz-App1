const mongoose=require('mongoose');

const question_schema=new mongoose.Schema({
    ques:String,
    option_1:String,
    option_2:String,
    option_3:String,
    option_4:String,
    ans:String,
});

const quiz_schema=new mongoose.Schema({
    quiz_name:String,
    questions:[question_schema],
    timeStamp:{type:String,default:new Date().toLocaleDateString()}

});

module.exports=mongoose.model('quiz',quiz_schema);