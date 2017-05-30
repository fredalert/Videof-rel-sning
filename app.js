var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);

var router = express.Router();
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');
var profile = require('./routes/profile');
var quiz = require('./routes/quiz');
var webutbildningar = require('./routes/webutbildningar');

var User = require('./model/user.js');



var app = express();
mongoose.connect("mongodb://localhost:27017/quiztest");
var db= mongoose.connection;



app.use('jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.use(session({
  secret:"I love treehouse",
  resave:true,
  saveUninitialized:false,
  store: new MongoStore({
  mongooseConnection:db
  }
  ),
}
));

app.use(function(req, res, next){
  res.locals.currentUser=req.session.userId;
  next();
});

db.on("error", console.error.bind(console, "connection error"));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname + "/public"));


app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/profile', profile);
app.use('/quiz', quiz);
app.use('/webutbildningar', webutbildningar);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
