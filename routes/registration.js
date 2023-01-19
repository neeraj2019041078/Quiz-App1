const express=require('express');

const router=express.Router();
const bcrypt=require('bcrypt');

const user=require('../models/user_schema');

router.post('/auth/register', async (req,res)=>{
    const{username,email,password}=req.body;

    try{
        const hashpass=await bcrypt.hash(password,10);
        let new_user=new user({username,email,hashpass});
        const data=await new_user.save();
        console.log(data);
    }
    catch(err)
    {
        console.log(err);
    }
    res.redirect('/auth/login');
});


module.exports=router;