
/*
 *  Generic require login routing middleware
 *  TODO Learn how to keep ?params when redirecting
 */

exports.requiresLogin = function (req, res, next) {
  if (!req.loggedIn) {
    req.flash('notice', 'You are not authorized. Please login')
    res.redirect('/login')
  }
  next()
}

// TODO understand how to write this
exports.requiresAdmin = function (req, res, next) {
	next()
}


/*
 *  User authorizations routing middleware
 */

exports.user = {
    hasAuthorization : function (req, res, next) {
      if (req.foundUser.id != req.session.auth.userId) {
        req.flash('notice', 'You are not authorized')
        res.redirect('/profile/'+req.foundUser.id)
      }
      next()
    }
}


/*
 *  Article authorizations routing middleware
 */

exports.article = {
    hasAuthorization : function (req, res, next) {
      if (req.article.owner.id != req.session.auth.userId) {
        req.flash('notice', 'You are not authorized');
        res.redirect('/article/'+req.article.id);
      }
      next()
    }
}  
