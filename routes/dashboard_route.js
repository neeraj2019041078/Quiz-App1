const express = require('express');
const router = express.Router();

const user = require('../models/user_schema');
const quiz = require('../models/quiz_schema');

const { ensureAuth } = require('../utils/auth');

router.get('/dashboard', ensureAuth, async (req, res) => {

    try {
        const cuser=await user.findOne({"_id":req.user._id});
        const quizzes = await quiz.find({}, { "_id": 1, "quiz_name": 1,"timeStamp":1});
        res.render("dashboard", { layout: "main", quizzes: JSON.stringify(quizzes),username:cuser.username });
    }
    catch (e) {
        console.log(e);
        res.render("Error Occured");
    }

});

router.get('/attempt-quiz/:id', ensureAuth, async (req, res) => {

    try {
        const cuser=await user.findOne({"_id":req.user._id});
        const cur_quiz = await quiz.findOne({ "_id": req.params.id }, { "quiz_name": 1, "questions": 1, "_id": 0 });
        res.render("quiz_attempt", { layout: "main", quiz_data: JSON.stringify(cur_quiz),username:cuser.username });
    }
    catch (e) {
        console.log(e);
        res.render("Error Occured");
    }

});

router.post('/attempt-quiz/:id', ensureAuth, async (req, res) => {

    try {
        const cur_quiz = await quiz.findOne({ "_id": req.params.id }, { "_id": 0 });
        let quiz_questions = cur_quiz.questions;

        let counter = 1;
        let score = 0;
        quiz_questions.forEach(question => {
            if (`q${counter}` in req.body) {
                let option = req.body[`q${counter}`];
                if (question[`option_${option[1]}`] == question.ans)
                    score++;
                counter++;
            }
        });
        score = ((score / (counter - 1)) * 100).toPrecision(4);
        score = String(score);

        const cuser=await user.findOne({"_id":req.user._id});

        const dat = await user.findOneAndUpdate({ "_id": cuser._id }, {
            $push: {
                quizzes: {
                    quiz_id: req.params.id,
                    score: score
                }
            }
        });

        console.log(dat);
        res.redirect(`/viewscore/${score}/${cur_quiz.quiz_name}/${req.params.id}`);
    }
    catch (e) {
        console.log(e);
        res.render("Error Occured");
    }
});

router.get('/viewscore/:score/:quiz_name/:id', async (req, res) => {
    const cuser=await user.findOne({"_id":req.user._id});
    res.render('viewscore', { score: req.params.score, quiz_name: req.params.quiz_name, quiz_id: req.params.id,username:cuser.username });
});

router.get('/myscores', ensureAuth, async (req, res) => {

    try {

        const cuser=await user.findOne({"_id":req.user._id});
        console.log(cuser);
        const scores = await user.findOne({ '_id': cuser._id });
        var quizs = [];

        for(let lquiz of scores.quizzes)
        {
            let cur_quiz = await quiz.findOne({ "_id": lquiz.quiz_id });
            console.log(lquiz);
            quizs.push({ "quiz_name": cur_quiz.quiz_name, "score": lquiz.score ,"time":lquiz.timeStamp});
        };

        console.log(quizs);

        res.render("myscores",{quiz_data:quizs,username:cuser.username});
    }
    catch (e) {
        console.log(e);
        res.render("Error Occured")
    }
});
module.exports = router;