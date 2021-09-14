var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var orgRouter = require("./routes/organization");
var billRouter = require("./routes/bill");
var goodsRouter = require("./routes/goods");

var app = express();

// 获取post数据的中间件
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// cookie中间件,传入加密密钥
app.use(cookieParser("jefferyQu"));

// 配置session
app.use(
  session({
    secret: "JefferyQu", //服务器端生成的session签名
    resave: false, //强制存储session，即使它没有变化
    saveUninitialized: true, //强制将未初始化的session存储
    rolling: true, //在每次请求时强制重置cookie，这将会重置cookie过期时间
    cookie: {
      maxAge: 1000 * 60 * 60, //session过期时间 因session基于cookie，所以cookie过期了session也会过期
      secure: false, //true 表示只有http协议才能访问cookie
    },
  })
);

app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    /*    var orginList=[
           "http://localhost:3000",
           "http://www.tiyanfu.vip",
           "http://tiyanfu.vip       ]
   /*    if(orginList.includes(req.headers.origin.toLowerCase())){
           //设置允许跨域的域名，*代表允许任意域名跨域
           res.header("Access-Control-Allow-Origin",req.headers.origin);
       }*/

    /*测试环境：全体开放*/
    res.header("Access-Control-Allow-Origin",'*');

    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/org", orgRouter);
app.use("/bill", billRouter);
app.use("/goods", goodsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
