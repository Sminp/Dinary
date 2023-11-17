import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'sessionStorage', // 고유한 key 값
  storage: sessionStorage,
});

export const postListState = atom({
  key: 'postListState',
  default: {
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    currentElements: 0,
    postInfo: null,
  },
});

export const postState = atom({
  key: 'postState',
  default: {
    id: null,
    title: '',
    body: '',
    emoji: 'Happy',
    createdAt: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const postErrorState = atom({
  key: 'postErrorState',
  default: {
    error: null,
  },
});
