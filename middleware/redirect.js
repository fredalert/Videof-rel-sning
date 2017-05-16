var loggedOut = function(req, res, next){
  if(req.session && req.session.userId){
  return res.redirect("/profile");
  }
  else{
    next();
  }
}

var requiresLogin = function(req, res, next){
  if(!req.session.userId || !req.session){
    var err = new Error("you must be logged in to see this page!");
    err.status=401;
    return next(err);
  }
  else {
    next();
  }
}

module.exports.loggedOut = loggedOut;
module.exports.requiresLogin = requiresLogin;
