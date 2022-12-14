import mongoose from 'mongoose';
import Joi from '../../../node_modules/joi/lib/index';
import Post from '../../models/post';

const { ObjectId } = mongoose.Types;

/*
{
  title : '제목',
  body : '내용',
  tag : ['태그1', '태그2']
}
*/

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  try {
    const post = await Post.findById(id);

    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.state.post = post;

    return next();
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const checkOwnPost = async (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

// 포스트 작성 : POST /api/posts
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required() : 필수 항목
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });

  //검증후, 검증 실패 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
    user: ctx.state.user,
  });

  try {
    await post.save(); //.save() : 데이터베이스에 저장
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

// 포스트 목록 조회 : GET /api/posts?username=&tag=&page=
export const list = async (ctx) => {
  // 값이 주어지지 않았다면 1을 기본으로 사용
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag, username } = ctx.query;

  // tag, username 값이 유효하면 객체 안에 넣고, 그렇지 않으면 넣지 않음.
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean() // .lean() :  mongoose 문서 인스턴스의 형태의 데이터를 JSON 형태로 조회 가능
      .exec();

    const postCount = await Post.countDocuments(query).exec();

    ctx.set('Last-Page', Math.ceil(postCount / 10));

    ctx.body = posts.map((post) => ({
      ...post,
      body:
        post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
    }));
  } catch (error) {
    ctx.throw(500, error);
  }
};

// 특정 포스트 조회 : GET /api/posts/:id
export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

// 특정 포스트 삭제 : DELETE api/posts/:id
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // 204 : No Content - 성공했지만, 응답 데이터는 없음
  } catch (error) {
    ctx.throw(500, error);
  }
};

// 포스트 수정(특정 필드 변경) : PATCH /api/posts/:id
export const update = async (ctx) => {
  const { id } = ctx.params;
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  //검증후, 검증 실패 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // update data return (false - before update data return)
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};
