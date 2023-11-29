import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import WriteForm from '../../components/write/WriteForm';
import { postState, postErrorState } from '../../State/postState';
import { userAccount } from '../../State/userState';
import client from '../../lib/api/client';

const emojiArr = ['Angry', 'Fear', 'Happy', 'Love', 'Sad', 'PokerFace'];

export default function EditorContainer() {
  const account = useRecoilValue(userAccount);
  const [write, setWrite] = useRecoilState(postState);
  const [post, setPost] = useRecoilState(postErrorState);
  const [postId, setPostId] = useState('');

  const navigate = useNavigate();

  const getTheme = async ({ account, body }) => {
    try {
      const res = await client.post('/diary/getTheme', { account, body });
      if (res.status === 200) {
        console.log('테마 가져오기 성공');
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

  const writePost = async ({ title, body, emoji, summed, theme, account }) => {
    try {
      const res = await client.post('/diary/new', {
        title,
        body,
        emoji,
        summed,
        theme,
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

  const updatePost = async ({
    title,
    body,
    emoji,
    summed,
    theme,
    account,
    id,
  }) => {
    try {
      const res = await client.post('/diary/rewrite', {
        title,
        body,
        emoji,
        summed,
        theme,
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
    console.log(e.target.value);
    if (emojiArr.includes(e.target.value)) {
      setWrite({
        ...write,
        emoji: e.target.value,
      });
    } else {
      setWrite({
        ...write,
        theme: e.target.value,
      });
    }
  };

  // 포스트 등록
  const onPublish = () => {
    try {
      if (write.id) {
        updatePost({
          title: write.title,
          body: write.body,
          emoji: write.emoji,
          theme: write.theme,
          summed: write.summed,
          account: account,
          id: write.id,
        });
      } else {
        setWrite({
          ...write,
          createdAt: new Date(),
        });
        console.log(write.emoji);
        const promise = writePost({
          title: write.title,
          body: write.body,
          emoji: write.emoji,
          theme: write.theme,
          summed: write.summed,
          account: account,
        });
        console.log(promise);

        const getData = () => {
          promise.then((res) => {
            console.log(res);
            setWrite({
              ...write,
              id: res.id,
            });
          });
        };
        getData();
      }
      return setPost({ error: false });
    } catch (e) {
      setPost({ error: true });
    }
  };

  // 취소
  const onCancel = () => {
    navigate(-1);
  };

  const onTheme = () => {
    try {
      const promise = getTheme({
        account: account,
        body: write.body,
      });
      // console.log(promise);

      const getData = () => {
        promise.then((res) => {
          setWrite({
            ...write,
            url1: res.url1,
            url2: res.url2,
            url3: res.url3,
            url4: res.url4,
            summed: res.summed,
          });
        });
      };
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  // 성공 혹은 실패 시 할 작업
  // 수정
  useEffect(() => {
    if (post.error === true) {
      console.log(post.error);
    } else if (post.error === false) {
      console.log('성공');
      console.log('1', write.id, '2', postId);
      if (write.id) {
        navigate(`/${account}/${write.id}`);
      } else {
        navigate(`/${account}/${postId}`);
      }
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
      onTheme={onTheme}
      onCancel={onCancel}
      tempEmoji={write.emoji}
    />
  );
}
