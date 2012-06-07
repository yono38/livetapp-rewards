// Reward template schema

var RewardSchema = new Schema({
    title       : {type : String, default : ''}
  , description : {type : String, default : ''}
  , earn_start  : Date
  , use_start   : Date
  , expires     : Date
})

RewardSchema.path('title').validate(function (title) {
  return title.length > 0
}, 'Reward title cannot be blank')

mongoose.model('Reward', RewardSchema)
