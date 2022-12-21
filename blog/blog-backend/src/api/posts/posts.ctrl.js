import Post from '../../models/post';

/*
{
  title : '제목',
  body : '내용',
  tag : ['태그1', '태그2']
}
*/

// 포스트 작성 : POST /api/posts
export const write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });

  try {
    await post.save(); //.save() : 데이터베이스에 저장
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

// 포스트 목록 조회 : GET /api/posts
export const list = async (ctx) => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (error) {
    ctx.throw(500, error);
  }
};

// 특정 포스트 조회 : GET /api/posts/:id
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

// 특정 포스트 삭제 : DELETE api/posts/:id
export const remove = (ctx) => {};

// 포스트 수정(특정 필드 변경) : PATCH /api/posts/:id
export const update = (ctx) => {};
