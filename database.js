const mongoose = require('mongoose');

// Connect to MongoDB (make sure MongoDB is running locally on your PC)
mongoose.connect('mongodb://localhost:27017/pakbazar')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection error:', err));

module.exports = mongoose;
