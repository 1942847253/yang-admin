const mongoose = require("mongoose");

const schem = new mongoose.Schema({
  key: { type: String },
  self_increasing: { type: Number },
});

module.exports = mongoose.model("Counters", schem);
