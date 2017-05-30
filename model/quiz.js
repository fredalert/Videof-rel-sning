var mongoose= require("mongoose");

var QuizSchema = new mongoose.Schema(
  {utbildningar:[
  {quizTitle:String,
    questions:
       [
      {isVideo:{
        type:Boolean,
        defualt:false,},
        url:{type:String,
        default:""},
        question:{type:String,
        default:""},
        _id:Number,


        comment:{type:String,
        default:""},
        correctAnswer:{type:Number,
          default:99},

        alternatives:[{alternativeName:{type:String,
        default:""},
                      alternativeNumber:{type:Number, default:99},

        }],
      }
    ]}

]});





var Quiz = mongoose.model('Quiz', QuizSchema);




module.exports=Quiz;
