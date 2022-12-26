import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postsCtrl.list); // (라우트의 경로, 해당 라우트에 적용할 미들웨어 함수)
posts.post('/', postsCtrl.write);

const post = new Router();

post.get('/', postsCtrl.read);
post.delete('/', postsCtrl.remove);
post.patch('/', postsCtrl.update);

posts.use('/:id', postsCtrl.checkObjectId, post.routes());

export default posts;
