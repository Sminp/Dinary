import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import AuthForm from '../../components/auth/AuthForm';
import { authCheckState, loginState } from '../../State/authState';
import {
  userImageState,
  userState,
  userThemeState,
} from '../../State/userState';
import client from '../../lib/api/client'; // 하드코딩

export default function LoginForm() {
  const [form, setForm] = useRecoilState(loginState);
  const [auth, setAuth] = useRecoilState(authCheckState);
  const setUsers = useSetRecoilState(userState);
  const setProfile = useSetRecoilState(userImageState);
  const setTheme = useSetRecoilState(userThemeState);
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

        if (response.status === 404) {
          console.log('로그인 실패');
          setAuth({ check: false });
        }
      })
      .catch((error) => {
        console.log(error.response);
        setAuth({ check: false });
      });
  };

  const getUser = async (account) => {
    try {
      const user = await client.get(`/user/${account}`);
      return user;
    } catch (e) {
      console.log(e);
    }
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

    await login({ account: form.account, password: form.password });
  };

  // 나중에 useCallback이나 useEffect로 최적화
  useEffect(() => {
    if (auth.check === false) {
      console.log('로그인 실패');
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
      return;
    }
    if (auth.check === true) {
      try {
        console.log('로그인 성공');
        const userData = getUser(form.account);
        const serverPath = client.defaults.baseURL;
        const getData = () => {
          userData.then((res) => {
            setProfile({
              userImage: `${serverPath}${res.data.userImage}`,
            });
            setTheme({ userTheme: res.data.userTheme });
          });
        };
        getData();

        setUsers({ account: form.account });

        setTimeout(() => {
          navigate(`/${form.account}`);
          // window.location.reload();
        }, 100);
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
