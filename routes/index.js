var express = require('express');
var router = express.Router();
var User = require('../model/user.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  User.findById(req.session.userId).exec(function(error, user){
    if(error){
      console.log("An error has occured when starting index-page");
      return next(error);
    }
    else{
    return res.render('index', {title:"index", name:""}
    );
    }
  });


});

module.exports = router;
