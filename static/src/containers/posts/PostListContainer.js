import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import Responsive from '../../components/common/Responsive';
import PostsAlign from '../../components/posts/PostsAlign';
import MonthlyCalendar from '../../components/posts/MonthlyCalendar';
import { postListState } from '../../State/postState';
import { userAccount } from '../../State/userState';
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
  // 로딩

  const listPosts = ({ account, x: year, y: month }) => {
    try {
      const res = client.post('/diary/list', { account });
      if (res.status === 200) {
        console.log('글 불러오기 성공');
        return res.data;
      } else if (res.status === 400) {
        console.log('데이터베이스 오류입니다.');
        return res.data;
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 포스트 목록 불러오기
  useEffect(() => {
    try {
      listPosts(account);
      setError(null);
    } catch (e) {
      console.log(e);
      setError('포스트 목록을 불러오는데 실패했습니다.');
    }
  }, []);

  // 에러 발생 시
  if (error) {
    console.log(error);
    return <PostListBlock>에러가 발생했습니다.</PostListBlock>;
  }

  return (
    <PostListBlock>
      <MonthlyCalendar account={account} posts={postList} />
      <PostsAlign account={account} posts={postList} />
    </PostListBlock>
  );
}
