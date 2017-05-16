var express = require('express');
var User = require('../model/user.js')
var router = express.Router();


router.get("/", function(req, res, next){
  if(req.session){
    req.session.destroy(function(err){
      if(err){
      return next(err);
      }
      else{ return res.redirect("/");
      }
    }
    );
  }
});

module.exports = router;
