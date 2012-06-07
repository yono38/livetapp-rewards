var User = mongoose.model('User')
	, Reward = mongoose.model('Reward')
	, EarnedReward = mongoose.model('EarnedReward')

module.exports = function (app) {

  app.param('rewardId', function (req, res, next, id) {

  })

  app.post('/:rewardId/generate', function (req, res) {
	// create new earned reward
	// returns json
  })
