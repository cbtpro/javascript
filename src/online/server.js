
var http = require('http');
const Koa = require('koa');
const app = new Koa();
const devConfig = require('./webpack.config.dev');
const webpack = require('webpack');
const compiler = webpack(devConfig);
const PORT = process.env.PORT || 3000;
//console.log('>>>>>>: ' + JSON.stringify(process.env));
//console.log('devConfig: ' + JSON.stringify(devConfig));

const devMiddleware = require('koa-webpack-dev-middleware')(compiler, {
  watchDelay: 300
});
const hotMiddleware = require('koa-webpack-hot-middleware')(compiler);
app.use(devMiddleware);
app.use(hotMiddleware);

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});
app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});
app.on('error', function(err,ctx){
    console.log(err);
});

app.listen(PORT);

console.log(`app started at port ${PORT}...`);