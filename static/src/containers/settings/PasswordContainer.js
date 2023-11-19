import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import UserTemplate from '../../components/settings/UserTemplate';
import PasswordChange from '../../components/settings/PasswordChange';
import { userAccount, userImage, userImageState } from '../../State/userState';
import { passwordState } from '../../State/authState';
// import { changePassword } from '../../lib/api/auth';
// import { postUserImage } from '../../lib/api/user';
import client from '../../lib/api/client'; // 하드코딩

const ContentBlock = styled.div`
  width: 746px;
  margin: 0 10px;
  background: ${(props) => props.theme.settingContent};
  border-radius: 16px;
  border: 1px solid ${(props) => props.theme.settingBorder};

  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    margin: 0 0 30px 0;

    font-size: 1.5rem;
    font-weight: 1000;
    color: ${(props) => props.theme.subtext};
  }
`;

export default function PasswordContainer() {
  const account = useRecoilValue(userAccount);
  const setProfile = useSetRecoilState(userImageState);
  const userProfile = useRecoilValue(userImage);
  const [form, setForm] = useRecoilState(passwordState);
  const [error, setError] = useState('');
  const [auth, setAuth] = useState('');
  const user = { account: account, userImage: userProfile };

  const changePassword = ({ account, password }) =>
    client
      .post('/user/changePw', { account, password })
      .then((res) => {
        if (res.status === 200) {
          console.log('변경 성공');
          alert('비밀번호가 변경되었습니다.');
        } else if (res.status === 404) {
          alert('아이디를 찾을 수 없습니다.');
        } else if (res.status === 400) {
          console.log('변경 실패');
          alert('비밀번호 변경에 실패했습니다.');
        }
      })
      .catch((err) => {
        console.log(err);
      });

  const postUserImage = async (account, formData) => {
    try {
      const res = await client.post(`/user/upload/${account}.jpg`, formData);
      if (res.data) {
        alert(res.data.msg);
        return res;
      } else {
        alert(res.data.msg);
      }
    } catch (err) {
      alert('전송 실패 : ' + err);
    }
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if ([form.password, form.passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
    } else if (form.password === form.passwordConfirm) {
      changePassword({ account: account, password: form.password });
    } else {
      setError('비밀번호가 일치하지 않습니다. 다시 입력해 주세요.');
    }
  };

  const onUpload = (e) => {
    const file = e.target.files[0];
    // const fileUrl = URL.createObjectURL(file);
    const correctForm = /(.*?)\.(jpg)$/; // |gif|png|jpeg|bmp|tif|heic| 삭제
    if (file.size > 1024 * 1024 * 10) {
      alert('10MB 이상의 이미지는 업로드 할 수 없습니다.');
      return;
    }
    if (!file.name.match(correctForm)) {
      alert('이미지 파일만 업로드가 가능합니다. (*.jpg)'); //, *.gif, *.png, *.jpeg, *.bmp, *.tif, *.heic 삭제
    } else {
      const formData = new FormData();
      formData.append('image', file);
      const serverPath = client.defaults.baseURL;
      const promise = postUserImage(account, formData);
      console.log(promise);
      const getData = () => {
        promise.then((res) => {
          console.log(`${serverPath}${res.data.userImage}`);
          setProfile({ userImage: `${serverPath}${res.data.userImage}` });
        });
      };

      getData();
      // setTimeout(() => {
      //   // window.location.reload();
      // }, 1000);
    }

    try {
    } catch (e) {
      console.log('localStorage is not working');
    }
  };

  return (
    <UserTemplate>
      <ContentBlock>
        <PasswordChange
          onChange={onChange}
          onUpload={onUpload}
          profile={user}
          onSubmit={onSubmit}
          form={form}
          error={error}
        />
      </ContentBlock>
    </UserTemplate>
  );
}
