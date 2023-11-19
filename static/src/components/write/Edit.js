import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import TextareaAutosize from 'react-textarea-autosize';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 30px 70px;
  background: ${(props) => props.theme.writeContent};
`;

const TitleInput = styled.input`
  width: 100%;
  height: 5rem;
  padding: 0 12px;
  outline: none;
  border: none;
  border-bottom: 1px solid ${palette.gray[0]}; // 수정
  background: ${(props) => props.theme.writeContent};

  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.theme.subtext};

  ::placeholder {
    color: ${palette.gray[0]};
  }
`;

const BodyInput = styled(TextareaAutosize)`
  width: 100%;
  padding: 12px;
  outline: none;
  border: none;
  background: ${(props) => props.theme.writeContent};

  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Noto Sans KR', sans-serif;
  color: ${(props) => props.theme.subtext};

  ::placeholder {
    color: ${palette.gray[0]};
  }
`;

export default function Edit({ post, onChangeField }) {
  return (
    <Container>
      <form name="write" method="POST">
        <TitleInput
          placeholder="제목을 입력해주세요"
          onChange={onChangeField}
          name="title"
          defaultValue={post.id ? post.title : ''}
        />
        <BodyInput
          placeholder="기억에 남는 일과 생각들을 기록해보세요!"
          name="body"
          minRows="7"
          spellCheck="true"
          onChange={onChangeField}
          cacheMeasurements="true"
          defaultValue={post.id ? post.body : ''}
        />
      </form>
    </Container>
  );
}
