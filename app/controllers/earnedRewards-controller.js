var User = mongoose.model('User')
	, Reward = mongoose.model('Reward')
	, EarnedReward = mongoose.model('EarnedReward')

module.exports = function (app) {

  app.param('earnedRewardId', function (req, res, next, id) {
		EarnedReward
			.findOne({_id : id })
			.run(function(err, earned_reward){
				if (err) return next(err);
				if (!earned_reward) return next(new Error('Reward Not Found ' + id))
				req.earned_reward = earned_reward;
				Reward
					.findOne({_id : req.earned_reward.reward_id})
					.run(function(err, reward){
						if (err) throw err
						if (!reward) return next(new Error('Earned Reward has no Template ' + req.earned_reward.reward_id))
						req.reward = reward
						if (req.earned_reward.ownedBy){
							User
								.findOne({_id : req.earned_reward.ownedBy})
								.run(function(err, user){
									if (err) throw err
									if (!user) return next(new Error('User Not Found ' + req.earned_reward.ownedBy))
									req.user = user
									next()
								})
						}
						next()
					})
			})
	})

	// let a user earn a reward
	app.post('/:earnedRewardId/earn', auth.requiresLogin, function(req, res){
		var usr_id = req.session.auth.userId;
		// check if user eligible for reward (not used and not owned same type already)
		// Someone already earned this reward! 		
		if (req.user){
			// was it you?
			if (req.user == usr_id){
				req.flash('notice', 'User already earned reward');
			}
			// guess it was someone else. Cheater!
			else {
				req.flash('notice', 'Reward already earned by another user');
			}
			// either way, you aren't getting this reward, so go home!
			res.redirect('/mytapp/'+usr_id);
		}
		// still up for the grabs!
		else {
			// but have you already earned one of this reward type??
			// do a search on logged in user's earned rewards where earned_reward.reward_id == earned_reward.reward_id
			EarnedReward
				.find({
					reward_id : req.reward._id,
					ownedBy : usr_id
				})
				.run(function(err, rwd){
					if (err) throw err;
					if (!rwd){
						var earned_reward = req.earned_reward;
						earned_reward.ownedBy = usr_id;
						earned_reward.save(function(err){
							if (err) {
								utils.mongooseErrorHandler(err, req);
							}
							else {
								req.flash('notice', 'Earned reward '+earned_reward._id+' successfully');
							}
							res.redirect('/mytapp/'+usr_id);
						})
					}
					else {
						res.redirect('/mytapp/'+usr_id);
					}
		}

	})
