const express=require('express');
const router=express.Router();

const quiz=require('../models/quiz_schema');

router.post('/newquiz', async(req,res)=>{

    let keys=Object.keys(req.body);
    const questions=[];
    let obj={};
    keys.forEach((key)=>{

        if(key.length==2)
        obj.ques=req.body[key];

        if(key.length==4 && key[0]=='q')
        {
            obj[`option_${key[3]}`]=req.body[key];
        }

        if(key[0]=='a')
        {
            obj.ans=req.body[key];
            questions.push(obj);
            obj={};
        }
    })

    let new_quiz=new quiz({quiz_name:req.body.quiz_name,questions});   
    
    try{
        const response=await new_quiz.save();
        console.log(response);
    }
    catch(err)
    {
        console.log(err);
    }
    
    res.redirect('/dashboard');

});

module.exports=router;