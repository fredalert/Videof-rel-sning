var mongoose= require("mongoose");
var bcrypt = require("bcrypt");

var UserSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true
    },
    quizzes: [{
      quiz: String,
      incorrectQuestions:[Number],
      correctQuestions:[],
      completedQuiz:Boolean,

    }],

});


UserSchema.statics.authenticate= function(email, password, callback){
  User.findOne({email:email})
    .exec(function(error, user){
      if(error){
        return callback(error);}
      else if(!user){
        var err= new Error("Did not find any matching email");
        err.stactus=401;
        return callback(err);}
      else{
          bcrypt.compare(password, user.password, function(error, result){
              if(result){
                return callback(null, user);
              }
            else{
              return callback(error);
                }
          });
      }
    }
  )
};
/*
UserSchema.statics.userAddIncorrect= function(userId, questionNumber){
console.log("Incorrect add to database function started")
console.log(userId);
console.log(this.name);
  User.findByIdAndUpdate({
 "_id" : userId,
 "quizzes.quiz" : "naziQuiz"
}).exec(function(error, user){
  if(error){return console.log("something went wrong")}
  else{
 $push: {
   "quizzes.$.incorrectQuestions":0
 }}
});}*/




UserSchema.pre("save", function(next){
var user=this;
bcrypt.hash(user.password, 10, function(err, hash)
{
if(err){
  return next(err);
}
else{
user.password = hash;
next();
}
})
});

var User = mongoose.model('User', UserSchema);




module.exports = User;
