const mongoose = require("mongoose");

const schem = new mongoose.Schema({
  name: { type: String },
  describe: { type: String },
  menu: { type: Array },
});

module.exports = mongoose.model("Role", schem);
