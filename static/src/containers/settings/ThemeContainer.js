import { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import UserTemplate from '../../components/settings/UserTemplate';
import Theme from '../../components/settings/Theme';
import { themeState } from '../../State/userState';
import client from '../../lib/api/client';

const ContentBlock = styled.div`
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

export default function ThemeContainer() {
  const [theme, setTheme] = useRecoilState(themeState);
  const [tempTheme, setTempTheme] = useState(theme);

  const postTheme = ({ account, theme }) => {
    client
      .post('/user/theme', { account, theme })
      .then((res) => {
        if (res.data.status === 200) {
          console.log('테마 변경 성공');

          localStorage.setItem('theme', tempTheme);
        } else if (res.data.status === 400) {
          console.log('테마 변경 실패');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheck = (e) => {
    setTempTheme(e.target.name);
  };

  const onClick = () => {
    setTheme(tempTheme);
    postTheme({ account: localStorage.getItem('account'), theme: tempTheme });
    // window.location.reload();
  };

  return (
    <UserTemplate>
      <ContentBlock>
        <Theme tempTheme={theme} onClick={onClick} handleCheck={handleCheck} />
      </ContentBlock>
    </UserTemplate>
  );
}
