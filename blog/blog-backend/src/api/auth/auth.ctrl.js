// 객체 검증을 위한 라이브러리
import Joi from '../../../node_modules/joi/lib/index';
import User from '../../models/user';
/*
    POST /api/auth/register
    {
        username:'velopert',
        password : 'mypass123'
    }
*/

export const register = async (ctx) => {
  // Request Body 검증하기
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;

  try {
    // username이 중복인지 확인
    const exists = await User.findByUsername(username);

    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }
    const user = new User({
      username,
    });
    await user.setPassword(password); // 비밀번호 설정
    await user.save(); // DB에 저장

    // 응답할 데이터에서 hashedPassword 필드 제거
    ctx.body = user.serialize();
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const login = async (ctx) => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }
  try {
    // 사용자 데이터 찾기
    const user = await User.findByUsername(username);

    if (!user) {
      ctx.status = 400;
      return;
    }

    const valid = await user.checkPassword(password);

    if (!valid) {
      ctx.status = 400;
      return;
    }

    ctx.body = user.serialize();
  } catch (error) {
    ctx.throw(500, error);
  }
};

export const check = async (ctx) => {};

export const logout = async (ctx) => {};
