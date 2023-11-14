import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import {
  userAccount,
  userImageState,
  userState,
  userThemeState,
} from '../../State/userState';
import { logout } from '../../lib/api/auth';
import Header from '../../components/common/header/Header';
import { authCheckState } from '../../State/authState';

export default function HeaderContainer() {
  const account = useRecoilValue(userAccount);
  const userImage = useRecoilValue(userImageState);
  const resetUser = useResetRecoilState(userState);
  const resetProfile = useResetRecoilState(userImageState);
  const resetTheme = useResetRecoilState(userThemeState);
  const resetAuth = useResetRecoilState(authCheckState);

  const navigate = useNavigate();

  // 에러 처리 추가 수정 localStorage removeItem사용
  const handleLogout = () => {
    resetUser();
    resetProfile();
    resetTheme();
    resetAuth();
    localStorage.removeItem('account');
    localStorage.removeItem('theme');
    localStorage.removeItem('user-image');
    logout();
    navigate('/');
  };

  return (
    <Header
      account={account}
      userImage={userImage.userImage}
      onLogout={handleLogout}
    />
  );
}
