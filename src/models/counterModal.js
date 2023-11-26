const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
  _id: String,
  sequence_value: Number
});

const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;
