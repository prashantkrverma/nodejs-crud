const mongoose = require("mongoose")

const People = new mongoose.Schema({
  fName: {
    type: String,
    minlength: 3,
    required: true
  },
  lName: {
    type: String,
    minlength: 3,
    required: true
  },
  email: {
    type: String,
    minlength: 5,
    validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    minlength: 10,
    maxlength: 10,
    unique: true,
    required: true
  },
  avatar: { 
      type: String,
      default: "" 
    }
});

module.exports = mongoose.model("people", People);