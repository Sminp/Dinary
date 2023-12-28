import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'sessionStorage', // 고유한 key 값
  storage: sessionStorage,
});

export const postListState = atom({
  key: 'postListState',
  default: {
    postList: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const post5Lists = atom({
  key: 'post5Lists',
  default: {
    post5Lists: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const postState = atom({
  key: 'postState',
  default: {
    id: null,
    title: '',
    body: '',
    updatedAt: '',
    sentiment: 'happiness',
    url1: '',
    url2: '',
    url3: '',
    theme: '',
    summed: '',
    r: '',
    g: '',
    b: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const postErrorState = atom({
  key: 'postErrorState',
  default: {
    error: null,
  },
});
