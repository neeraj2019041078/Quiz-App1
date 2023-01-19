const express=require('express');
const router=express.Router();

const {ensureGuest}=require('../utils/auth');

router.get('/',ensureGuest,(req,res)=>{
    res.render("home",{layout:"login"});
});

router.get('/auth/register',ensureGuest,(req,res)=>{
    res.render('register',{layout:"login"});
});

router.get('/auth/login',ensureGuest,(req,res)=>{
    res.render('login',{layout:"login"});
});

router.get('/create/quiz',(req,res)=>{
    res.render('createquiz')
});



module.exports=router;