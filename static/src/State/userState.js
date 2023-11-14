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
    const account = userAccount;
    const userImage = userImageState;
    const userTheme = userThemeState;
    console.log(account, userImage, userTheme);

    return { account, userTheme, userImage };
  },
});

export const userAccount = selector({
  key: 'userAccount',
  get: ({ get }) => {
    const user = get(userState);
    return user.account;
  },
});
