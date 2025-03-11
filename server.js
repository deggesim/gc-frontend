const Koa = require('koa');
const serve = require('koa-static');
const send = require('koa-send');

const app = new Koa();

app.use(serve('dist/gc-frontend/browser'));

// always send index.html to handle PathLocationStrategy routing
// https://link.medium.com/vHIZGVzA96
app.use(async (ctx) => {
  await send(ctx, 'dist/gc-frontend/browser/index.html');
});

app.listen(process.env.PORT || 5000);
