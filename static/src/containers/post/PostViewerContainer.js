import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import PostViewer from '../../components/post/PostViewer';
// import { removePost, readPost } from '../../lib/api/posts';
import { userAccount } from '../../State/userState';
import { postState } from '../../State/postState';
import client from '../../lib/api/client';

export default function PostViewerContainer() {
  const { postId } = useParams();
  const account = useRecoilValue(userAccount);
  const post = useRecoilValue(postState);
  // reset도 할 것 수정
  const navigate = useNavigate();

  // 처음 마운트될 때 포스트 읽기 API 요청

  const deletePost = async ({ account, id }) => {
    try {
      const res = await client.post(`/diary/delete/`, {
        account,
        id,
      });
      if (res.status === 200) {
        console.log('글 수정 성공');
        return res.data;
      } else if (res.status === 400) {
        console.log('데이터베이스 오류입니다.');
        return res.data;
      } else if (res.status === 404) {
        console.log('없는 계정입니다.');
        return res.data;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const viewPost = async ({ id, account }) => {
    try {
      const res = await client.post(`/diary/load`, { id, account });
      if (res.status === 200) {
        console.log('글 수정 성공');
        return res.data;
      } else if (res.status === 400) {
        console.log('데이터베이스 오류입니다.');
        return res.data;
      } else if (res.status === 404) {
        console.log('글을 찾지 못했습니다.');
        return res.data;
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    viewPost(postId);
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      // unloadPost();
    };
  }, [postId]);

  const onEdit = () => {
    navigate('/write');
  };

  const onRemove = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      deletePost(postId);
    } else {
      return;
    }
    try {
      navigate(`/:${account}`); // 메인화면으로 이동
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <PostViewer
      // error={error}
      // post={viewPost}
      account={account}
      post={post}
      onEdit={onEdit}
      // actionButtons={ownPost && <PostActionButtons onEdit={onEdit} />}
      onRemove={onRemove}
    />
  );
}
