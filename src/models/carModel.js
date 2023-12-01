const mongoose = require('mongoose');
const { Schema } = mongoose;

const Counter = require('./counterModal'); // Adjust the path as necessary

const carSchema = new mongoose.Schema({
    carname: { type: String, required: true },
    carprice: { type: String, required: true },
    carimage: { type: String, required: true },
    ownerId: { 
         type:Number,
        //  mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    licensePlate: { type: String, required: true, unique: true },
    carID: Number,
  // ...
});

carSchema.pre('save', async function(next) {
  if (this.isNew) {
    const count = await Counter.findByIdAndUpdate(
      { _id: 'carID' },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    this.carID = count.sequence_value;
  }
  next();
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
