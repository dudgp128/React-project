import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { initializeForm, changeField, register } from '../../modules/auth';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [error, setError] = useState(null);

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

    // 빈칸이 하나라도 있는 경우,
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈칸을 모두 입력하세요.');
      return;
    }

    // 비밀번호가 일치하지 않은 경우,
    if (password !== passwordConfirm) {
      setError('비밀번호 확인 오류');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'register', key: 'passwordConfirm', value: '' }),
      );
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
      // 이미 계정이 존재할 때
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정입니다.');
        return;
      }
      setError('회원가입 실패');
      return;
    }

    if (auth) {
      dispatch(check());
    }
  }, [authError, auth, dispatch]);

  const navigate = useNavigate();
  // user값이 잘 설정되었는지 확인하기
  useEffect(() => {
    if (user) {
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.log('localStorage is not working');
      }
    }
  }, [navigate, user]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default RegisterForm;
