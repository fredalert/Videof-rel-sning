var express = require('express');
var router = express.Router();
var User = require("../model/user.js")
var mid = require('../middleware/redirect.js');

/* GET home page. */
router.get('/', mid.loggedOut, function(req, res, next) {

  res.render('register', { title: 'register' });
});


router.post('/', function(req, res, next) {
  if(req.body.name && req.body.email && req.body.password && req.body.confirmPassword){
    if(req.body.password!= req.body.confirmPassword){
      var error= new Error("passwords do not match");
      error.status=400;
      return next(error);}
      else{
        var userData={
          name:req.body.name,
          email:req.body.email,
          password:req.body.password,
            }
      User.create(userData, function(error, user){
      if(error){
        return next(error);
      }
      else{
        res.redirect("profile");
      }
      });
      }
}
else{
  var error = new Error("Please fill in all fields");
  error.status=400;
  return next(error);
}


});

module.exports = router;
