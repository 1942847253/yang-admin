const mongoose = require("mongoose");

const schem = new mongoose.Schema({
  rid: { type: Number },
  pid: { type: Number },
  path: { type: String },
  name: { type: String },
  icon: { type: String },
  title: { type: String },
});

module.exports = mongoose.model("Menu", schem);
