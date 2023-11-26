const mongoose = require('mongoose');
const { Schema } = mongoose;
const Counter = require('./counterModal');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userID: Number,
});

userSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await Counter.findByIdAndUpdate(
      { _id: 'userID' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.userID = count.sequence_value;
  }
  next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;
