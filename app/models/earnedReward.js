// Earned Reward schema

var EarnedRewardSchema = new Schema({
    reward_id   : {type : Schema.ObjectId, ref : 'Reward'}
  , used  : {type : Bool, default: false}
})

mongoose.model('EarnedReward', EarnedRewardSchema)
