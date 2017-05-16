var mongoose= require("mongoose");

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

/* QuizSchema.statics.createQuestion = function(quiz, questionNumber){

Quiz.findOne({_id:questionNumber}).


}
*/

var Quiz = mongoose.model('Quiz', QuizSchema);




module.exports=Quiz;
