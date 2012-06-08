var User = mongoose.model('User')
	, Reward = mongoose.model('Reward')
	, EarnedReward = mongoose.model('EarnedReward')

module.exports = function (app) {

  app.param('rewardId', function (req, res, next, id) {
	Reward.
	  findOne({_id : id})
	  .run(function (err, reward) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load Reward Template ' + id));
        req.reward = reward;
		next()
	  })
  })

  // create new earned reward
  app.post('/:rewardId/generate', function (req, res) {

	var date = Date.now();
	// check if not valid to earn yet
	if (date < req.reward.earn_start) {
		res.redirect('/mytapp?msg=too_early');
	}
	// check if reward expired
	else if (date > req.reward.expires) {
		res.redirect('mytapp?msg=expired');
	}
	else{
		var earned_reward = new EarnedReward({});
		earned_reward.reward_id = req.params.rewardId;
		earned_reward.save(function(err){
			if (err) {
				utils.mongooseErrorHandler(err, req);
			}
			else {
				req.flash('notice', 'Generated reward '+earned_reward._id+' successfully');
			}
			res.redirect('/'+earned_reward._id+'/earn');
		})
	}
  })

  // create new reward template
  app.post('/reward', auth.requiresAdmin, function (req, res) {
	var reward = new Reward({req.body.reward});
	reward.save(function(err) {
		if (err) {
			utils.mongooseErrorHandler(err, req);
		}
		else {
			req.flash('notice', 'Created new reward template '+reward._id+'successfully');
		}
		res.write(JSON.stringify(earned_reward);
		res.end();
	})
  })
