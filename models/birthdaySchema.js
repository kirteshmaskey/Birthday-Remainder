const mongoose = require('mongoose');

const birthdaySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  dob: {
    type: Date,
    require: true,
  },
});

const bd = new mongoose.model("birthdays", birthdaySchema);

module.exports = bd;