var express = require("express");
var router = express.Router();
var Org = require("../modules/orgSchema");
// 获取数据
router.get("/", function (req, res, next) {
    res.json({
        code: 1,
        msg: "组织接口请求成功",
    });
});

// 查询所有组织
router.get("/query", function (req, res, next) {
    const params=req.query
    let resData = {
        list: [],
        code: 0,
        msg: "",
    };

let orgType={
            shop:'0',
            vendor:'1',
            vendorShop:'2'
    }
    let filter=[]

        switch (params.orgType){
            case 'shop':
                filter=[orgType.shop,orgType.vendorShop]
                break
            case 'vendor':
                filter=[orgType.vendor,orgType.vendorShop]
                break
            case 'all':
                filter=[orgType.shop,orgType.vendor,orgType.vendorShop]
                break
        }

    Org.find({
        orgType:{$in:filter}
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

/*查询业务*/
router.get("/queryBusiness", function (req, res, next) {
    let param = req.query;

    let resData = {
        list: [],
        code: 0,
        msg: "",
    };

    Org.find({orgId: param.orgId})
        .then((ret) => {
            console.log(ret);
            resData.code = 1;
            resData.msg = "查询成功";
            resData.list = ret[0].business;
        })
        .catch((err) => {
            console.log("错误信息", err);
        })
        .finally(() => {
            res.json(resData);
        });
});


/*查询供应商*/
router.get("/queryByType", function (req, res, next) {
    let param = req.query;

    let resData = {
        code: 0,
        msg: "",
        list: [],
    };

    Org.find(
        {orgType: param.orgType}
    )
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
