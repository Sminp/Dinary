import { atom, selector, RecoilEnv } from 'recoil';
import { recoilPersist } from 'recoil-persist';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const { persistAtom } = recoilPersist({
  key: 'localStorage', // 고유한 key 값
  storage: localStorage,
});

export const userState = atom({
  key: 'userState',
  default: {
    account: 'account',
  },
  effects_UNSTABLE: [persistAtom],
});

export const userThemeState = atom({
  key: 'userThemeState',
  default: {
    userTheme: 'basicTheme',
  },
  effects_UNSTABLE: [persistAtom],
});

export const userImageState = atom({
  key: 'userImageState',
  default: {
    userImage: `${process.env.PUBLIC_URL}/images/User/Profile.svg`,
  },
  effects_UNSTABLE: [persistAtom],
});

export const userAccount = selector({
  key: 'userAccount',
  get: ({ get }) => {
    const userAccount = localStorage.getItem('account');
    if (!userAccount) {
      const account = get(userState);
      return account.account;
    }
    return userAccount;
  },
});

export const userTheme = selector({
  key: 'userTheme',
  get: ({ get }) => {
    const userTheme = localStorage.getItem('theme');
    if (!['basicTheme', 'greenTheme', 'darkTheme'].includes(userTheme)) {
      const theme = get(userThemeState);
      return theme.userTheme;
    }
    return userTheme;
  },
});

export const userImage = selector({
  key: 'userImage',
  get: ({ get }) => {
    const userImage = localStorage.getItem('user-image');
    if (!userImage) {
      const image = get(userImageState);
      return image.userImage;
    }
    return userImage;
  },
});
