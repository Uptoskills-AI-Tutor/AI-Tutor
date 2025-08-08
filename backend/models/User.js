const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
<<<<<<< HEAD
  platform: { type: String, default: 'Email & Password' },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
});

module.exports = mongoose.model('User', userSchema);
=======
  platform: { type: String, default: 'Email & Password' }
});

module.exports = mongoose.model('User', userSchema);
>>>>>>> 483fb3c7969c56b545a1a151b9f35d9e46855ae5
