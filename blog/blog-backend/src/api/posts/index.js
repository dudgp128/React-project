const Router = require('koa-router');
const posts = new Router();

const printInfo = (ctx) => {
  //현재 요청의
  ctx.body = {
    method: ctx.method, // 메서드
    path: ctx.path, // 경로
    params: ctx.params, // 파라미터
  };
};

posts.get('/', printInfo); // (라우트의 경로, 해당 라우트에 적용할 미들웨어 함수)
posts.post('/', printInfo);
posts.get('/:id', printInfo);
posts.delete('/:id', printInfo);
posts.put('/:id', printInfo);
posts.patch('/:id', printInfo);

module.exports = posts;
