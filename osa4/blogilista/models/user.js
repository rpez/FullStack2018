const mongoose = require('mongoose')
mongoose.set('debug', true)

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.statics.format = (user) => {
    return {
        id: user._id,
        username: user.username,
        name: user.name,
        blogs: user.blogs
    }
}

const User = mongoose.model('User', userSchema)

module.exports = User