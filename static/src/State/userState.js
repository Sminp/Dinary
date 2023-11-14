import { atom, selector, RecoilEnv } from 'recoil';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const userState = atom({
  key: 'userState',
  default: {
    account: 'account',
  },
});

export const userThemeState = atom({
  key: 'userThemeState',
  default: {
    userTheme: 'basicTheme',
  },
});

export const userImageState = atom({
  key: 'userImageState',
  default: {
    userImage: '/images/User/Profile.svg',
  },
});

export const getUserState = selector({
  key: 'getUserState',
  get: async ({ get }) => {
    // const account = userAccount;
    // const userImage = userImageState;
    // const userTheme = userThemeState;

    const account = localStorage.getItem('account');
    const userImage = localStorage.getItem('user-image');
    const userTheme = localStorage.getItem('theme');

    return { account, userTheme, userImage };
  },
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
    console.log(userImage);
    if (!userImage) {
      const image = get(userImageState);
      return image.userImage;
    }
    return userImage;
  },
});
