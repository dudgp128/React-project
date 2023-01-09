import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { initializeForm, changeField, register } from '../../modules/auth';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  // useSelector : connect 대신 redux 상태 조회 가능
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));

  // useDispatch : 컴포넌트에서 스토어의 내장 함수 dispatch 사용
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();

    const { username, password, passwordConfirm } = form; // == register
    if (password !== passwordConfirm) {
      // Todo : 오류 처리
      return;
    }
    dispatch(register({ username, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  // register success/failure
  useEffect(() => {
    if (authError) {
      console.log('error occurred', authError);
      return;
    }
    if (auth) {
      console.log('register success', auth);
      dispatch(check());
    }
  }, [authError, auth, dispatch]);

  const navigate = useNavigate();
  // user값이 잘 설정되었는지 확인하기
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;
