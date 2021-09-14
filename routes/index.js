var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    code:1,
    msg:'服务连接成功',
    mixin:'哦~看呐，你找到了什么？'
  })
});

module.exports = router;
