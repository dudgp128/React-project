import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../../components/auth/AuthForm';
import { initializeForm, changeField } from '../../modules/auth';

const RegisterForm = () => {
  const { form } = useSelector(({ auth }) => ({ form: auth.register }));
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

  useEffect(() => dispatch(initializeForm('register')), [dispatch]);

  return <AuthForm type="register" form={form} onChange={onChange} />;
};

export default RegisterForm;
