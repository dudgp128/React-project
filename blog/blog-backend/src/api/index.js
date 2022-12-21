import Router from 'koa-router';
import posts from './posts';

const api = new Router();

api.use('/posts', posts.routes()); // posts 라우트 적용

export default api;
