import Router from 'koa-router';
import auth from './auth';
import posts from './posts';

const api = new Router();

api.use('/posts', posts.routes()); // posts 라우트 적용
api.use('/auth', auth.routes());

export default api;
