var express = require('express');

var mid = require('../middleware/redirect.js');
var Quiz = require('../model/quiz.js');
var quiz1 = require("../mockfiles/quiz.js");
var User = require('../model/user.js');
var request = require('then-request');
//var scripts = require('../public/javascripts/javaScriptcode.js')
var endedQuiz= false;

var router = express.Router();
var currentQuiz="";

var currentQuestion={};
let counter= 0;
var userSessionId={};
var currentUser={};
var correct="";


/************FUNCTIONS**********************
*******************************************/

/*******add a completed quiz to user profile, checks if its alredy added******************/

var displayVideo= function(res){
  console.log("displayVideo function started");
res.render("/");

}

var addQuizToUser = function(req, next){
  console.log("quiz added to user function started");
  var isQuizDone =false;
  User.findById(userSessionId).exec(function(err, user){
 if(err) {console.log("error in addQuizToUser function");
 next(err);}

for(let i=0; i<user.quizzes.length; i+=1){
  if(user.quizzes[i].quiz==="naziQuiz"){
    isQuizDone = true;}
  }
if(!isQuizDone){
  console.log("The quiz has not been done before and a function adding the quiz to the user starts")
  User.findByIdAndUpdate(

          req.session.userId,
          {$addToSet: {"quizzes": {quiz:"naziQuiz"}}}, ///Can be changed to quiz title..
          {new:true, upsert: true, safe:true},
          function(err, model) { //väldigt oklart vad detta gör. Ta bort?
            if(err){
              console.log("errorfunction activated");}
          }
      );}

if(isQuizDone){
  console.log("the quiz is already added, so it will not be added to the user");

}

}
);}




/*******add a new quiz to mongo******************/

var addQuiz = function(quiz, next){
  console.log("addQuiz function started");
  var newQuiz = new Quiz(quiz);
  newQuiz.save(function(err, quiz){
    if(err){
  next(err); }
    else{
        console.log("succes adding a new quiz to mongodb");
    }
  });
  }

/*******finding the quiz in mongo******************/

/*******render a questionspage******************/
var renderFunction = function(req, res, next){

  console.log("renderFunction started");

console.log("The current Quiz when entering the renderFunction is:" + currentQuiz);
 Quiz.findOne({"utbildningar.quizTitle":currentQuiz},{'utbildningar.$': 1}, function (err, quiz) {
      if (err) {
        console.log("something went wrong in findOne in renderFunction")
        return next(err)
      }
    else{
      console.log("This quiz is in renderFunction is: "+ quiz.utbildningar[0].quizTitle);
      quiz=quiz.utbildningar[0];
      if(quiz.questions[counter].isVideo){
        console.log("The question is not a question, its a video!");
        return res.render("../views/video.jade", {name:"the profile name"});

      }



      res.render('quiz', {  quizTitle: quiz.quizTitle,
                            question: quiz.questions[counter].question,
                            alt1: quiz.questions[counter].alternatives[0].alternativeName,
                            alt2: quiz.questions[counter].alternatives[1].alternativeName,
                            alt3: quiz.questions[counter].alternatives[2].alternativeName,
                            alt4: quiz.questions[counter].alternatives[3].alternativeName,
                            name:"the profile name"
     });

     return console.log("quizz named "+ quiz.quizTitle + " added");
    }

  });
    }

/*******determine if the quiz ended******************/
var isQuizEnded= function(req, next){
  console.log("isquizEnded function started")
if(counter>=naziQuiz.questions.length){
  console.log("the length of the "+ naziQuiz.quizTitle +" is: "+naziQuiz.questions.length)
  console.log("quiz ended is: "+(counter>=naziQuiz.questions.length))

  endedQuiz=true;
  console.log("quizended boolean is now true")
  counter=0;
  addQuizToUser(req, next);

}
};

/*******corrects the quiz******************/
var corrector = function(req, res, next){
  if(!req.body.alternative){ //No elternative was chosen
    console.log("please submit an answer");
    return;
  }
  console.log("Correctorfunction started .The correct answer is: "+currentQuestion.correctAnswer+ " . And your choice was "+ req.body.alternative);
  if(req.body.alternative==currentQuestion.correctAnswer){ //Correct
counter+=1;

    //isQuizEnded(req, next);
    return res.render("../views/questionCorrect.jade", {
      question:currentQuestion.question,
      isCorrect:"Correct!",
      comment:currentQuestion.comment

    });}
    if(req.body.alternative!=currentQuestion.correctAnswer){
      console.log("Not correct answer")
      //User.userAddIncorrect(userSessionId, counter);
      counter+=1;
        return res.render("../views/questionCorrect.jade", {
          question:currentQuestion.question,
          isCorrect:"Incorrect.",
          comment:currentQuestion.comment

                            });

  console.log("thw counter after wrong alternative is :" + counter);
isQuizEnded(req, next);

      }
     }







///////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
/* GET home page. */
router.get('/', mid.requiresLogin, function(req, res, next) {
  console.log("router.getfunction started");
  currentQuiz=req.body.quizName;
 userSessionId=req.session.userId;

//addQuiz(quiz1, next); //This is a function that can be activated if adding a quiz to mongodb
endedQuiz=false;
if(currentQuiz==req.body.quizName){
renderFunction(req, res);
}




}
    );

router.post("/", function(req, res, next){
  currentQuiz=req.body.quizName;

  if(req.body.movieNext=="movieNext"){
    console.log("nextMovie button clicked");
    counter+=1;
    isQuizEnded(req, res);
    renderFunction(req, res, next);
  }
if(req.body.movieNext!="movieNext"){
console.log("movieNext function not started: "+ req.body.answer);
if(req.body.answer=="answer"){

corrector(req, res, next);}
if(req.body.next=="next"){
  isQuizEnded(req, res);
  renderFunction(req,res, next);
}
console.log("the counter is :" +counter);}
if(endedQuiz){

 console.log("the quiz has ended function started");
 res.render("../views/quizended.jade");
}
else{
renderFunction(req, res, next);
}

});


module.exports = router;
