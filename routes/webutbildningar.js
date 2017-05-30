var express = require('express');
var router = express.Router();
var User = require('../model/user.js');
var Quizzols = require('../model/quiz.js');



/* GET home page. */
router.get('/', function(req, res, next) {
Quizzols.findOne(function(error, quizzes){
  if (error){console.log("something went wrong in webutbildningar");}
  else{
console.log("this is: "+this);
console.log("Quizzes.quizTitle:     "+quizzes.utbildningar[0]);

    return res.render("webutbildningar", {quizTitle:quizzes.utbildningar});


}})});

module.exports = router;
