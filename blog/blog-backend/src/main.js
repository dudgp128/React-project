require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import createFakeData from './createFakeData';

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    //createFakeData();
  })
  .catch((e) => {
    console.log('★', e);
  });

const app = new Koa();
const router = new Router();
import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';

// api 라우트 적용
router.use('/api', api.routes()); // => /api/test

// 라우터 적용 전에 bodyparser 사용하기
app.use(bodyParser());

// 라우터 적용 전에 jwMiddleware를 적용하기
app.use(jwtMiddleware);

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// PORT가 지정되지 않았다면, 4000을 사용
const port = 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
