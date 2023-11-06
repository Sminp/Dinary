import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import AuthForm from '../../components/auth/AuthForm';
import { registerState } from '../../State/authState';
import { register } from '../../lib/api/auth';

export default function RegisterForm() {
  const [form, setForm] = useRecoilState(registerState);
  const resetState = useResetRecoilState(registerState);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if ([form.account, form.password, form.passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    const response = register({
      account: form.account,
      password: form.password,
    });
    if (response === false) {
      setError('이미 존재하는 계정명입니다.');
    } else if (response === true) {
      setError('성공');
    }
  };

  useEffect(() => {
    if (error === 'e') {
      setError('회원가입 실패');
    }
    if (error === '성공') {
      console.log('check API 성공');
      alert('회원가입 성공');
      navigate('/');
      resetState();
    }
  }, [error]);

  return (
    <AuthForm
      type="register"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
}
