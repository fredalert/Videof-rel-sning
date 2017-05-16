var express = require('express');
var User = require('../model/user.js');
var mid = require('../middleware/redirect.js');
var naziQuiz = require('../model/quiz.js');
var router = express.Router();


/* GET home page. */
router.get('/', mid.requiresLogin, function(req, res, next) {
  res.render('quiz', { title: 'Log in' });
  naziQuiz.save(function (err, naziQuiz) {
    if (err) return console.error(err);
  });
});

router.post("/", function(req, res, next){

});

module.exports = router;
