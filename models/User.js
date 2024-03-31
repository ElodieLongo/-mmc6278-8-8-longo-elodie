const { Schema, model, models } = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
// Create a username property of type String that is required
username: {
  type: String,
  required: true
},
// Create a password property of type String that is required
// with minimum length of 5 and max length 20
password: {
  type: String,
  required: true,
  minlength: 5,
  maxlength: 20
}
});
// hashes the password before it's stored in mongo
UserSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
  this.password = await bcrypt.hash(this.password, 10);
  next();
  } catch (error) {
    return next(error);
  }
});

module.exports = models.User || model('User', UserSchema)
