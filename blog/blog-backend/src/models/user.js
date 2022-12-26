import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

// 비밀번호를 파라미터로 받아 계정의 hashedPassword 값을 설정
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

const User = mongoose.model('User', UserSchema);
export default User;
