var http = require('http');
var https = require('https');
var koa = require('koa');
var app = new koa();

app.use(async (ctx, next) => {
    //这里第①顺序执行
    const start = Date.now();
    await next();  //等价于yield next(es6语法); 是es7的语法
    //这里第④顺序执行
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(async (ctx, next) => {
    //这里第②顺序执行
    const start = Date.now();
    await next();
    //这里最后第⑤顺序执行
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url}  cost ${ms} ms`);
});

/**
* 所有的请求都会被处理，并返回“hello world”,当然也可以使用复杂的html代码，
* 模板引擎也是在这个地方开始解析模板，生成html并返回页面
*/
app.use(function *() {
    //这里第③顺序执行
    this.body = 'Hello World';
});

//app.listen(3000);
http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);