module.exports = (options) => {
  //使用jsonwebtoken 生成token及效验token
  const jwt = require("jsonwebtoken");
  //使用http-assert便捷返回错误信息
  const assert = require("http-assert");
  const AdminUser = require("../models/AdminUser");
  return async (req, res, next) => {
    try {
      if (req.path === "/login") {
        await next();
        return;
      }
      const token = String(req.headers.authorization || "")
        .split(" ")
        .pop();
      if (!token) {
        res.status(401).send("请先登录");
      }
      const { id } = jwt.verify(token, req.app.get("secret"));
      if (!id) {
        res.status(401).send("请先登录");
        return;
      }
      req.user = await AdminUser.findById(id);
      if (!req.user) {
        res.status(401).send("请先登录");
        return;
      }
      await next();
    } catch (err) {
      res.status(401).send("登录已失效，请重新登录");
      return;
    }
  };
};
