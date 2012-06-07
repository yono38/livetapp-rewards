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

	app.post('/:earnedRewardId/earn', function(req, res){
			// check if user eligible for reward (not used and not owned same type already)
	})
