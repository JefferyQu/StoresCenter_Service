var mongoose = require("./db");
const Schema = mongoose.Schema;

// 集合的结构
const goodsSchema = new Schema({
    pluCode:String,
    pluName:String,
    clsId:String,
    clsName:String,
    price:Number,
    vipPrice:Number,
    size:String,
    unit:String,
    orgId:String,
    orgName:String,
});

// 定义数据库模型
// 1.model里的第一个参数，首字母要大写  2.要和数据库集合名相对应 3.第三个参数可选，是真正连接的集合名
// 这个模型会自动和模型名称复数的集合相联结，如传入User会自动连接users
const Goods = mongoose.model("Goods", goodsSchema);

module.exports = Goods;
