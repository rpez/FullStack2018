const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  adult: Boolean,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = (user) => {
  return {
    _id: user._id,
    username: user.username,
    name: user.name,
    blogs: user.blogs,
    adult: user.adult
  }
}

// koska käytän samaa kantaa kuin eräässä toisessa sovelluksessa
// jossa myös Users-kokoelma, talletan tämän sovelluksen 
// käyttäjät kokoelmaan BlogUsers
const User = mongoose.model('User', userSchema)
module.exports = User