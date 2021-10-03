var express = require("express");
var router = express.Router();
var Category = require("../modules/categorySchema");
// 获取数据
router.get("/", function (req, res, next) {


    res.json({
        code: 1,
        msg: "类目接口请求成功",
    });
});

// 根据类型和组织查询单据
router.get("/query", function (req, res, next) {
    let resData = {
        list: [],
        code: 0,
        msg: "",
    };

    Category.find()
        .then((ret) => {
            console.log(ret);
            resData.code = 1;
            resData.msg = "查询成功";
            resData.list = ret;
        })
        .catch((err) => {
            console.log("错误信息", err);
        })
        .finally(() => {
            res.json(resData);
        });
});
module.exports = router;
