var express = require("express");
var router = express.Router();
const User = require("../modules/userSchema");

// 获取数据
router.get("/", function (req, res, next) {
  res.json({
    code: 1,
    msg: "请求成功",
  });
});

// 添加数据
router.post("/sign_up", function (req, res, next) {
  let param = req.body;
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");

  console.log(param);
  let user = new User({
    username: param.username,
    password: param.password,
    orgId: "",
    orgName: "",
  });

  let resData = {
    code: 0,
    msg: "",
  };
  User.find({
    username: param.username,
    password: param.password,
  })
    .then((ret) => {
      if (ret.length) {
        resData.msg = "用户已存在";
        res.json(resData);
      } else {
        user.save((err, ret) => {
          // console.log("错误", err);
          console.log("结果", ret);
          resData.code = 1;
          resData.msg = "添加成功";
          res.json(resData);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// 登录
router.post("/login", function (req, res, next) {
  let param = req.body;

  console.log(param);

  let resData = {
    code: 0,
    msg: "",
    username: "",
    orgId: "",
    orgName: "",
    panelModule:[]
  };
  User.find({
    username: param.username,
    password: param.password,
  })
    .then((ret) => {
      if (ret.length) {
        resData.code = 1;
        resData.msg = "登录成功";
        resData.orgId = ret[0].orgId;
        resData.orgName = ret[0].orgName;
        resData.username = ret[0].username;
        resData.panelModule = ret[0].panelModule;
      } else {
        resData.msg = "用户名或密码错误";
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      res.json(resData);
    });
});

/*修改用户信息*/
router.post("/save", function (req, res, next) {
  let param = req.body;


  console.log('参数',param);
  param.panelModule=JSON.parse(param.panelModule)

  let resData = {
    code: 0,
    msg: "",
  };
  User.updateOne({
    username:param.username
  },{
    $set:{
      orgId:param.orgId,
      orgName:param.orgName,
      panelModule:param.panelModule
    }
  }).then(ret=>{
    console.log('处理结果',ret);
    resData.code=1
    resData.msg='保存成功！'
  })
      .catch((err) => {
        resData.msg='保存失败'
        console.log(err);
      })
      .finally(() => {
        res.json(resData);
      });
});

module.exports = router;
