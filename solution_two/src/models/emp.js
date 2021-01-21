const mongoose = require("mongoose");

const empschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pswd: {
    type: String,
    required: true,
  },
});

const Emp = new mongoose.model("empreg", empschema);

module.exports = Emp;
