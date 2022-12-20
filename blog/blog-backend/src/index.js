const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
const api = require('./api');

// api 라우트 적용
router.use('/api', api.routes()); // => /api/test

// 라우터 적용 전에 bodyparser 사용하기
app.use(bodyparser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Listen to port 4000');
});
