import { useState } from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
import Emoji from '../../common/Emoji';

const Fullscreen = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: black;
  opacity: 0.25;
`;

const AskModalBlock = styled.div`
  width: 550px;
  height: 594.97px;
  background: ${(props) => props.theme.content};
  padding: 15px;
  border-radius: 16px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.125);
  z-index: 999;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transform: translate(73%, 40%);

  position: fixed;

  p {
    margin-bottom: 3rem;
  }

  .buttons {
    display: flex;
    justify-content: flex-end;
  }

  .header {
    width: 100%;
    padding: 0 10px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .content {
    width: 100%;
    height: 40%;
    padding: 9px 20px;
    background: ${(props) => props.theme.background};
    border-radius: 16px;
    box-shadow: 0px 4px 4px 0 rgba(0, 0, 0, 0.25);

    // width: 715px;
    // height: 292px;
  }

  .theme-header {
    height: 30px;
    margin: 0;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    color: #666666;
    // margin: 5px 5px 0 5px;
  }

  .loading {
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;

    font-weight: 500;

    img {
      width: 30px;
      height: 30px;
      margin: 0 10px 0 20px;
    }
  }

  .emoji {
    padding: none;
    size: 90%;
  }

  .theme {
    padding: 5px 0 0 0;
    margin: auto;

    display: block;

    overflow-x: auto;
    white-space: nowrap;
    scroll-behavior: smooth;

    button {
      width: 80px;
      height: 80px;
      margin: 7px 3px;
      border: 5px solid ${(props) => props.theme.background};

      display: inline-block;

      &:hover {
        cursor: pointer;
      }

      &:focus {
        border: 5px solid ${(props) => props.theme.text};
      }
    }

    div {
      width: 125px;
      height: 125px;
      margin: 7px 3px;
      border: 5px solid ${(props) => props.theme.background};

      display: inline-block;
    }
  }
`;

const XButton = styled(Button)`
  width: 15px;
  height: 15px;
  background-image: url(${process.env.PUBLIC_URL}/images/Write/XButton.svg);
  background-size: cover;
`;

export function AskModal({
  tempEmoji,
  visible,
  title,
  confirmText = '확인',
  onConfirm,
  onCancel,
  onClick,
  theme,
}) {
  const loading = ['1', '2', '3', '4'];

  if (!visible) return null;
  return (
    <>
      <Fullscreen onClick={onCancel} />
      <AskModalBlock>
        <div className="header">
          <div className="theme-header">
            <h4>{title}</h4>
          </div>
          <XButton onClick={onCancel} />
        </div>
        <div className="content emoji">
          <div className="theme-header">
            <h4>감정 구슬</h4>
          </div>
          <Emoji tempEmoji={tempEmoji} onClick={onClick} />
        </div>
        <div className="content">
          <div className="theme-header">
            <h4>오늘의 테마</h4>
            {theme[0] ? (
              ''
            ) : (
              <div className="loading">
                <img
                  src={`${process.env.PUBLIC_URL}/images/Write/Loading.gif`}
                  alt="loading"
                />{' '}
                테마를 생성하는 중입니다...
              </div>
            )}
          </div>

          <div className="theme">
            {console.log(theme)}
            {theme[0]
              ? theme.map((theme) => {
                  return (
                    <button
                      key={theme}
                      onClick={onClick}
                      style={{
                        backgroundImage: `url(${theme})`,
                        backgroundSize: 'cover',
                        width: '125px',
                        height: '125px',
                      }}
                      value={theme}
                    />
                  );
                })
              : loading.map((idx) => {
                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/images/Post/defaultTheme.svg)`,
                        backgroundSize: 'cover',
                        widht: '125px',
                        height: '125px',
                      }}
                    />
                  );
                })}
          </div>
        </div>
        <div className="buttons">
          <Button $done="true" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </AskModalBlock>
    </>
  );
}

export default function ImageModal({ onPublish, onChange, tempEmoji, themes }) {
  const [open, setOpen] = useState(true);

  const onConfirm = () => {
    setOpen(false);
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <AskModal
      tempEmoji={tempEmoji}
      visible={open}
      title={'Dinary가 감정과 테마를 분석했어요!'}
      confirmText="완료"
      onConfirm={onPublish}
      onCancel={onCancel}
      onClick={onChange}
      theme={themes}
    />
  );
}
