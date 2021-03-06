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

// 查询所有商品
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

// 添加商品
router.post("/add", function (req, res, next) {

    let params = req.body
    console.log(req.body);
    let resData = {
        code: 0,
        msg: "",
    };

    const goods=new Goods({
        pluCode:params.pluCode || '000'+Date.now(),
        pluName:params.pluName,
        clsId:params.clsId,
        clsName:params.clsName,
        price:params.price,
        vipPrice:params.vipPrice,
        size:params.size,
        unit:params.unit,
        orgId:params.orgId,
        orgName:params.orgName,
        imgUrl:params.imgUrl,
        inventory:params.inventory,
        publish:params.publish
    })
    goods.save((err, ret) => {
        if (err) {
            resData.msg = '保存失败'
        } else {
            resData.code = 1;
            resData.msg = "保存成功";
        }
        res.json(resData);
    })

});

module.exports = router;
