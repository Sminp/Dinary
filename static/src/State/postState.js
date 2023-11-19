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

export const postState = atom({
  key: 'postState',
  default: {
    id: null,
    title: '',
    body: '',
    emoji: 'Happy',
    updatedAt: '',
    backgroundImage: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const postErrorState = atom({
  key: 'postErrorState',
  default: {
    error: null,
  },
});
