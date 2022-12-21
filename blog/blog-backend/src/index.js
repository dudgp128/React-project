require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URL } = process.env;

const app = new Koa();
const router = new Router();
const api = require('./api');

// api 라우트 적용
router.use('/api', api.routes()); // => /api/test

// 라우터 적용 전에 bodyparser 사용하기
app.use(bodyparser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// PORT가 지정되지 않았다면, 4000을 사용
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
