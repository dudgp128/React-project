import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeFrom } from '../../modules/auth';
import AuthForm from '../../components/auth/AuthForm';

const LoginForm = () => {
  const form = useSelector(({ auth }) => ({
    form: auth.login,
  }));
  const dispatch = useDispatch();

  // input 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  //컴포넌트가 처음 렌더링 될 때, form을 초기화함.
  useEffect(() => dispatch(initializeFrom(form)), [dispatch]);

  return <AuthForm type="login" form={form} onChangeField={onChange} />;
};

export default LoginForm;
