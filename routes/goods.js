var express = require("express");
var router = express.Router();
var Goods = require("../modules/goodsSchema");
// 获取数据
router.get("/", function (req, res, next) {
    res.json({
        code: 1,
        msg: "商品接口请求成功",
    });
});

// 查询所有组织
router.get("/query", function (req, res, next) {

    let params=req.query
    let resData = {
        list: [],
        code: 0,
        msg: "",
    };
    Goods.find()
        .then((ret) => {
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
