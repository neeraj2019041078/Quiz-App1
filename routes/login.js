const express=require('express');

const router=express.Router();

router.get('/login',(req,res)=>{
    res.render('login',({layout:'login'}));
});

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

module.exports=router;