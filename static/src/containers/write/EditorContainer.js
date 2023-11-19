import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import WriteForm from '../../components/write/WriteForm';
import { postState, postErrorState } from '../../State/postState';
import { userAccount } from '../../State/userState';
import client from '../../lib/api/client';

export default function EditorContainer() {
  const account = useRecoilValue(userAccount);
  const [write, setWrite] = useRecoilState(postState);
  const [post, setPost] = useRecoilState(postErrorState);

  const navigate = useNavigate();

  const writePost = async ({ title, body, emoji, account }) => {
    try {
      const res = await client.post('/diary/new', {
        title,
        body,
        emoji,
        account,
      });
      if (res.status === 200) {
        console.log('글 작성 성공');
        return res.data;
      } else if (res.status === 400) {
        console.log('데이터베이스 오류입니다.');
        alert('다시 시도해주세요.');
        return res.data;
      } else if (res.status === 404) {
        console.log('없는 계정입니다.');
        return res.data;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updatePost = async ({ title, body, emoji, account, id }) => {
    try {
      const res = await client.post('/diary/rewrite', {
        title,
        body,
        emoji,
        account,
        id,
      });
      if (res.status === 200) {
        console.log('글 수정 성공!');
        return res.data;
      } else if (res.status === 400) {
        console.log('데이터베이스 오류입니다.');
        alert('다시 시도해주세요.');
        return res.data;
      } else if (res.status === 404) {
        console.log('없는 계정입니다.');
        return res.data;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeField = (e) => {
    if (e.target.name) {
      setWrite({
        ...write,
        [e.target.name]: e.target.value,
      });
      return;
    }

    setWrite({
      ...write,
      emoji: e.target.value,
    });
  };

  // 포스트 등록
  const onPublish = () => {
    try {
      if (write.id) {
        updatePost({
          title: write.title,
          body: write.body,
          emoji: write.emoji,
          account: account,
          id: write.id,
        });
      } else {
        setWrite({
          ...write,
          createdAt: new Date(),
        });
        const promise = writePost({
          title: write.title,
          body: write.body,
          emoji: write.emoji,
          account: account,
        });
        console.log(promise);

        const getData = () => {
          promise.then((res) => {
            const id = String(res).split('/')[2].split('.')[0];
            setWrite({
              ...write,
              id: id,
            });
          });
        };
        getData();
      }
      setTimeout(() => {
        return setPost({ error: false });
      }, 1000);
    } catch (e) {
      setPost({ error: true });
    }
  };

  // 취소
  const onCancel = () => {
    navigate(-1);
  };

  // 성공 혹은 실패 시 할 작업
  // 수정
  useEffect(() => {
    if (post.error === true) {
      console.log(post.error);
    } else if (post.error === false) {
      console.log('성공');
      navigate(`/${account}/${write.id}`);
      // window.location.reload();
      // reset();
    }
    setPost({ error: null });
  }, [post.error]);

  return (
    <WriteForm
      post={write}
      onChangeField={onChangeField}
      onPublish={onPublish}
      onCancel={onCancel}
      tempEmoji={write.emoji}
    />
  );
}
