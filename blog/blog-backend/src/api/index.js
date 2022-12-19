const Router = require('koa-router');
const api = new Router();

const posts = require('./posts');

api.use('/posts', posts.routes()); // posts 라우트 적용

module.exports = api;
