const mongoose = require('mongoose');
const AssemblySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  bikeType: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: false },
});
module.exports = mongoose.model('Assembly', AssemblySchema);
