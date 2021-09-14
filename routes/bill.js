var express = require("express");
var router = express.Router();
var Bill = require("../modules/billSchema");
// 获取数据
router.get("/", function (req, res, next) {
    res.json({
        code: 1,
        msg: "单据接口请求成功",
    });
});

// 根据类型和组织查询单据
router.get("/queryByType", function (req, res, next) {

    let params=req.query
    let resData = {
        list: [],
        code: 0,
        msg: "",
    };
    Bill.find({
        billType:params.billType,
        orgId:params.orgId
    })
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

// 根据单号查询单据详情
router.get("/queryByCode", function (req, res, next) {

    let params=req.query
    console.log(params);
    let resData = {
        detail:'',
        code: 0,
        msg: "",
    };
    Bill.find({
        billCode:params.billCode,
    })
        .then((ret) => {
            resData.code = 1;
            resData.msg = "查询成功";
            resData.detail = ret[0];
            console.log(ret);
        })
        .catch((err) => {
            console.log("错误信息", err);
        })
        .finally(() => {
            res.json(resData);
        });
});

router.post('/save',function (req,res){
    let params=req.body
    params.goodsList=JSON.parse(params.goodsList)
    let resData = {
        code: 0,
        msg: "",
    };
    console.log(params);
    let bill=new Bill({
        billCode:params.billCode || '80'+new Date()*1,
        billType:params.billType,
        orgId:params.orgId,
        orgName:params.orgName,
        vendorId:params.vendorId,
        vendorName:params.vendorName,
        createTime:params.createTime,
        handleTime:params.handleTime,
        maker:params.maker,
        status:params.status,
        remark:params.remark,
        goodsList:params.goodsList
    })

    bill.save((err, ret) => {
        console.log("错误", err);
        console.log("结果", ret);
        if (err){
            resData.msg='保存失败'
        }else {
            resData.code = 1;
            resData.msg = "保存成功";
        }

        res.json(resData);
    })
})

module.exports = router;
