// Reward template schema

var RewardSchema = new Schema({
    title       : {type : String, default : ''}
  , description : {type : String, default : ''}
  , earn_start  : {type : Date, default: Date.now}
  , use_start   : Date
  , expires     : Date
})

RewardSchema.path('title').validate(function (title) {
  return title.length > 0
}, 'Reward title cannot be blank')

RewardSchema.path('use_start').validate(function(use_start) {
  return use_start != undefined
}, 'Must set use start date')

RewardSchema.path('expires').validate(function(expires) {
  return expires != undefined
}, 'Must set expiration date')

mongoose.model('Reward', RewardSchema)
