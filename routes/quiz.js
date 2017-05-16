var express = require('express');

var mid = require('../middleware/redirect.js');
var Quiz = require('../model/quiz.js');

var router = express.Router();
var naziQuiz ={};



/* GET home page. */
router.get('/', mid.requiresLogin, function(req, res, next) {

  Quiz.findOne(function(err, quizes){
    if(err){
      return next(err);
    }
    else{
      naziQuiz =quizes;
let i=0;
const thisquestion=naziQuiz.questions[i];
      res.render('quiz', { quizTitle: thisquestion.quizTitle,
                              question: thisquestion.question,
                              alt1: thisquestion.alternatives[0].alternativeName,
                              alt2: thisquestion.alternatives[1].alternativeName,
                              alt3: thisquestion.alternatives[2].alternativeName,
                              alt4: thisquestion.alternatives[3].alternativeName
       });
        return console.log(thisquestion.length);
      }
    });

  });

router.post("/", function(req, res, next){
console.log(thisquestion.quizTitle);

});

module.exports = router;
