import client from './client';

// post 글쓰기
export const writePost = ({ title, body, tags }) =>
  client.post('/api/posts', { title, body, tags });

// post 조회하기
export const readPost = (id) => client.get(`/api/posts/${id}`);
