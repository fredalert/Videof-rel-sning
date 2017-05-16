var express = require('express');
var router = express.Router();
var User = require('../model/user.js');
var mid = require('../middleware/redirect.js');

/* GET home page. */
router.get('/', mid.requiresLogin, function(req, res, next) {
    User.findById(req.session.userId).exec(function(error, user){
      if(error){
        return next(error);
      }
      else{
      return res.render('profile', { title: 'Profile', name:user.name }
      );
      }
    });


  });

module.exports = router;
