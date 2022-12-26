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

    // 회원가입에 성공했을때 토큰을 사용자에게 전달하기
    const token = user.generateToken();

    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
      httpOnly: true,
    });
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

    // 로그인에 성공했을때 토큰을 사용자에게 전달하기
    const token = user.generateToken();

    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
      httpOnly: true,
    });
  } catch (error) {
    ctx.throw(500, error);
  }
};

// 로그인 상태 확인
export const check = async (ctx) => {
  const { user } = ctx.state;
  if (!user) {
    // 로그인 중 아님
    ctx.state = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};

export const logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204; //No Content
};
