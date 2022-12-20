const Router = require('koa-router');
const posts = new Router();
const postCtrl = require('./posts.ctrl');

posts.get('/', postCtrl.list); // (라우트의 경로, 해당 라우트에 적용할 미들웨어 함수)
posts.post('/', postCtrl.write);
posts.get('/:id', postCtrl.read);
posts.delete('/:id', postCtrl.remove);
posts.put('/:id', postCtrl.replace);
posts.patch('/:id', postCtrl.update);

module.exports = posts;
