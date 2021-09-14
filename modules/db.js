var mongoose = require("mongoose");

//建立数据库连接
mongoose.connect(
  "mongodb://127.0.0.1:27017/GP",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log("数据库连接失败", err);
      return;
    }
    console.log("数据库连接成功");
  }
);

module.exports = mongoose;
