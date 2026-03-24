const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Please provide a company name'],
    trim: true,
  },
  position: {
    type: String,
    required: [true, 'Please provide a position'],
    trim: true,
  },
  type: {
    type: String,
    enum: ['Part Time', 'Full Time'],
    required: [true, 'Please specify job type'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
    trim: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Job', jobSchema);
