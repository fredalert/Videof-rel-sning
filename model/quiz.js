var mongoose= require("mongoose");

var quiz1 = require("../mockfiles/quiz.js")



var QuizSchema = new mongoose.Schema(
  {quizTitle:String,
    questions:
       [
      {question:String,
        _id:Number,
        comment:String,
        correctAnswer:Number,
        alternatives:[{alternativeName:String,
                      alternativeNumber:Number,

        }],
      }
    ]
  }
);

var Quiz = mongoose.model('Quiz', QuizSchema);

var naziQuiz= new Quiz(quiz1);


module.exports=naziQuiz;
