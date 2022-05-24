const getIncreaseUniqueId = require("../utils/index");
module.exports = (app) => {
  const express = require("express");
  const router = express.Router();

  //使用jsonwebtoken 生成token及效验token
  const jwt = require("jsonwebtoken");
  //使用http-assert便捷返回错误信息
  const assert = require("http-assert");

  const Menu = require("../models/Menu");
  const AdminUser = require("../models/AdminUser");
  const Role = require("../models/Role");

  //登录效验中间件
  const authMiddleware = require("../middleware/auth");

  // 管理员登录
  router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    //1.根据用户名找用户
    const user = await AdminUser.findOne({ username }).select("+password");
    if (!user) {
      res.status(422).send("用户不存在");
      return;
    }
    // assert(user, 422, "用户不存在");
    //2.效验密码
    const isOk = require("bcryptjs").compareSync(password, user.password);
    if (!isOk) {
      res.status(422).send("密码错误");
      return;
    }
    //3.返回token  使用josnwebtoken进行token验证  npm install josnwebtoken --save
    const token = jwt.sign({ id: user._id }, app.get("secret"));
    res.send({
      token,
      uid: user._id,
      username: user.username,
    });
  });

  //新增管理员
  router.post("/insertUser", async (req, res) => {
    await AdminUser.create(req.body);
    res.send({ msg: "ok" });
  });

  // 修改管理员
  router.post("/updateUser", async (req, res) => {
    const { id, data } = req.body;
    if (id === "6281d355ebd7058a7e93c82c") {
      res.status(422).send("当前用户已锁定,无法修改");
      return;
    }
    const { username, position } = data;
    const user = await AdminUser.findById(id);

    user.username = username;
    user.position = position;
    user.save();
    res.send({ msg: "ok" });
  });

  // 查找管理员
  router.post("/findUser", async (req, res) => {
    const { id, data } = req.body;
    const user = await AdminUser.findById(id);
    res.send(user);
  });

  // 获取用户列表
  router.post("/getUserList", async (req, res) => {
    const userList = await AdminUser.find().populate("position");
    res.send(userList);
  });

  router.post("/insertUserMenu", async (req, res) => {
    let test = [
      {
        rid: 6,
        pid: 0,
        path: "authority",
        name: "Authority",
        icon: "IceCreamRound",
        title: "权限管理",
      },
      {
        rid: 7,
        pid: 6,
        path: "menuEdit",
        name: "MenuEdite",
        icon: "Menu",
        title: "菜单编辑",
      },
      {
        rid: 8,
        pid: 6,
        path: "authorityEdit",
        name: "AuthorityEdit",
        icon: "UserFilled",
        title: "权限分配",
      },
    ];
    // await Menu.insertMany(test);
  });

  // 获取当前用户菜单
  router.post("/getUserMenu", async (req, res) => {
    try {
      const { uid } = req.body;
      const user = await AdminUser.findById(uid).populate("position");
      const menuList = await Menu.find();
      let userMenuList = [];
      if (user.position.name === "超级管理员") {
        res.send(menuList);
      } else {
        user.position.menu.forEach((rid) => {
          menuList.forEach((menu) => {
            if (menu.rid == rid) {
              userMenuList.push(menu);
            }
          });
        });
        res.send(userMenuList);
      }
    } catch (err) {
      res.status(401).send("请先登录");
    }
  });

  // 获取角色菜单
  router.post("/getRoleMenu", async (req, res) => {
    const { id } = req.body;
    const role = await Role.findById(id);
    const menuList = await Menu.find();
    let roleMenu = [];
    role.menu.forEach((rid) => {
      menuList.forEach((menu) => {
        if (menu.rid == rid && menu.pid !== 0) {
          roleMenu.push(menu.rid);
        }
      });
    });
    res.send(roleMenu);
  });

  // 获取角色列表
  router.post("/getRoleList", async (req, res) => {
    const list = await Role.find();
    res.send(list);
  });

  // 获取全部菜单
  router.post("/getMenuList", async (req, res) => {
    const list = await Menu.find();
    res.send(list);
  });

  // 更新角色菜单
  router.post("/updateRoleMenu", async (req, res) => {
    const { roleMenuIds, id } = req.body;

    const menuList = await Menu.find();
    const parentMenu = menuList.map((item) => {
      if (item.pid === 0) {
        return item.rid;
      }
    });
    let roleMenu = parentMenu
      .filter((item) => item)
      .concat(roleMenuIds)
      .sort((a, b) => a - b);

    const targetRole = await Role.findById(id);
    if (targetRole.name !== "超级管理员") {
      targetRole.menu = roleMenu;
      targetRole.save();
      res.send({
        status: 200,
        msg: "ok",
      });
    } else {
      res.send({
        status: 200,
        msg: "无法更改超级管理员的权限",
      });
    }
  });

  // 添加父级/子级菜单
  router.post("/insertParentMenu", async (req, res) => {
    try {
      const { icon, path, title, pid } = req.body;
      const rid = await getIncreaseUniqueId();
      const menuItem = {
        icon,
        name: path.match(/\/([^/]*)$/)[1],
        path,
        title,
        pid: pid ? pid : 0,
        rid: rid,
      };
      console.log(menuItem);
      await Menu.create(menuItem);
      const admin = await Role.findOne({ name: "超级管理员" });
      admin.menu.push(rid);
      admin.save();
      res.send("ok");
    } catch {
      res.status(401).send("菜单格式有误");
    }
  });

  // 更新菜单
  router.post("/updateMenu", async (req, res) => {
    const { _id, pid } = req.body;
    const unpassStr = "628206d54f07c72f23afcb28";
    const menu = await Menu.findById(unpassStr);
    if (_id === unpassStr || pid === menu.rid) {
      res.status(422).send("权限菜单已被后台锁定,无法修改");
      return;
    }
    await Menu.findByIdAndUpdate(_id, req.body);
    res.send("ok");
  });
  app.use("/web/api", authMiddleware(), router);
};
