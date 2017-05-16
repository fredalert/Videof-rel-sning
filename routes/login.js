var express = require('express');
var User = require('../model/user.js');
var mid = require('../middleware/redirect.js');
var router = express.Router();



/* GET home page. */
router.get('/', mid.loggedOut, function(req, res, next) {
  res.render('login', { title: 'Log in' });
});

router.post("/", function(req, res, next){
  if(req.body.email && req.body.password){
    User.authenticate(req.body.email, req.body.password, function(error, user){
      if(error || !user){
        var err = new Error("No user or error");
        return next(err);
      }
      else{
        req.session.userId=user._id;

        return res.redirect("/profile");
      }
    }
  );
  }
    else{
      var err= new Error("please fill in both password and email!");
      err.status=401;
      return next(err);
    }
});

module.exports = router;
