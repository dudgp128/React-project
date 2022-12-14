import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

// 비밀번호를 파라미터로 받아 계정의 hashedPassword 값을 설정
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

// 파라미터로 받은 비밀번호가 해당 계정의 비밀번호와 일치하는지 검증
UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

// username으로 데이터 찾기, static 함수에서의 this는 모델(User)를 가리킴.
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

// hashedPassword 필드가 응답되지 않도록 데이터를 JSON으로 변환후, 필드 지우기
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  // jwt.sing(토큰 안에 집어 넣고 싶은 데이터, JWT 암호)
  const token = jwt.sign(
    {
      _id: this.id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d', // 7일동안 유효
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
