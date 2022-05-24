module.exports = (app) => {
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://127.0.0.1:27017/yang-admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// npm i require-all  将models文件夹下使用模块引用一遍，避免报错
require("require-all")(__dirname + "/../models");
