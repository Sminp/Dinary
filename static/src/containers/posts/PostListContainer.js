import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import Responsive from '../../components/common/Responsive';
import PostsAlign from '../../components/posts/PostsAlign';
import MonthlyCalendar from '../../components/posts/MonthlyCalendar';
import { postListState } from '../../State/postState';
import { userAccount } from '../../State/userState';
// import { listPosts } from '../../lib/api/posts';
import client from '../../lib/api/client';

const PostListBlock = styled(Responsive)`
  width: 100%;
  padding: 50px 40px;

  display: flex;
  flex-direction: row;
  justify-body: space-between;
`;

export default function PostListContainer() {
  const account = useRecoilValue(userAccount);
  const [postList, setPostList] = useRecoilState(postListState);
  const [error, setError] = useState('');
  // const [loading, setLoading] = useRecoilState(postState).loading;

  const listPosts = ({ account }) => {
    client
      .get(`/diarys/${account}`)
      .then((response) => {
        console.log('200', response.data);

        if (response.status === 200) {
          console.log('글리스트 불러오기 성공');
          setPostList({
            ...postList,
            totalPages: response.data.totalPages,
            totalElements: response.data.totalElements,
            currentPage: response.data.currentPage,
            currentElements: response.data.currentElements,
            postInfo: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  // 포스트 목록 불러오기
  useEffect(() => {
    listPosts(account);
    try {
    } catch (e) {
      console.log(e);
      setError('포스트 목록을 불러오는데 실패했습니다.');
    }
  }, []);

  // // 에러 발생 시
  // if (error) {
  //   console.log(error);
  //   return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  // }

  return (
    <PostListBlock>
      <MonthlyCalendar account={account} posts={postList} />
      <PostsAlign account={account} posts={postList} />
    </PostListBlock>
  );
}
