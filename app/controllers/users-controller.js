var User = mongoose.model('User')
	, EarnedReward = mongoose.model('EarnedReward')

module.exports = function (app) {

  app.param('profileId', function (req, res, next, id) {
    User
      .findOne({ _id : id })
      .run(function (err, user) {
        if (err) return next(err)
        if (!user) return next(new Error('Failed to load User ' + id))
        req.foundUser = user
				EarnedReward
					.find({ownedBy : req.foundUser})
					.run(function(err, rewards) {
						if (err) throw err
						req.rewards = rewards
        		// TODO going to need to populate reward template info eventually!
						next()
      })
  })

	// Login (start page)
	app.get('/login', function (req, res) {
		res.render('users/login', {

		})
	})

	
  // Signup by email
  app.get('/signup', function (req, res) {
		res.render('users/signup', {

		})
  })

  // Handles session Logout
  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/login')
  })

  // Profile view
  app.get('/mytapp/:profileId', auth.requiresLogin, function (req, res) {
    var user = req.foundUser
    res.render('users/profile', {
		user: user
      , earned_rewards : rewards
    })
  })

  app.get('/mytapp', auth.requiresLogin, function (req, res){
	res.redirect('/mytapp/'+req.session.auth.userId);
  }


}
