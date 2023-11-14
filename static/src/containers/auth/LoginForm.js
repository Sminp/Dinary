import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import AuthForm from '../../components/auth/AuthForm';
import { authCheckState, loginState } from '../../State/authState';
// import { login } from '../../lib/api/auth';
// import { getUser } from '../../lib/api/user';
import {
  userImageState,
  userState,
  userThemeState,
} from '../../State/userState';
import client from '../../lib/api/client'; // 하드코딩

export default function LoginForm() {
  const [form, setForm] = useRecoilState(loginState);
  const [auth, setAuth] = useRecoilState(authCheckState);
  const [user, setUser] = useRecoilState(userState);
  const [profile, setProfile] = useRecoilState(userImageState);
  const [theme, setTheme] = useRecoilState(userThemeState);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async ({ account, password }) => {
    await client
      .post(`/user/${account}`, { account, password })
      .then((response) => {
        console.log('200', response.data);

        if (response.data.auth === null) {
          setAuth({ check: false });
        }

        if (response.status === 200) {
          console.log('로그인 성공');
          setAuth({ check: true });
        }
      })
      .catch((error) => console.log(error.response));
  };

  const getUser = async (account) => {
    const user = await client.get(`/user/${account}`);

    setUser({
      account: account,
    });
    setProfile({ userImage: user.data.userImage });
    setTheme({ userTheme: user.data.userTheme });
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if ([form.account, form.password].includes('')) {
      setError(`아이디 또는 비밀번호를 모두 입력하세요.`);
      return;
    }
    // const response = login({ account: form.account, password: form.password });

    await login({ account: form.account, password: form.password });

    // if (response === false) {
    //   setAuth({ check: false });
    // } else if (response === true) {
    //   setAuth({ check: true });
    // }
  };

  // 나중에 useCallback이나 useEffect로 최적화
  useEffect(() => {
    if (auth.check === false) {
      console.log('로그인 실패');
      return;
    }
    if (auth.check === true) {
      try {
        console.log('로그인 성공');
        getUser(form.account);
        console.log(form.account);
        localStorage.setItem('account', form.account);
        localStorage.setItem('theme', theme.userTheme);
        localStorage.setItem('user-image', profile.userImage);
        navigate(`/${form.account}`);
      } catch (e) {
        console.log(e);
      }
    }
  }, [auth.check]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
}
