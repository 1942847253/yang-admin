const mongoose = require("mongoose");

const schem = new mongoose.Schema({
  username: { type: String },
  menu: { type: Array },
  position: { type: mongoose.SchemaTypes.ObjectId, ref: "Role" },
  password: {
    type: String,
    select: false,
    //npm install bcrypt 用于密码散列加密
    set(val) {
      return require("bcryptjs").hashSync(val, 10);
    },
  },
});

module.exports = mongoose.model("AdminUser", schem);
