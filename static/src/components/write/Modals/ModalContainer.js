import { useState } from 'react';
import ImageModal from './ImageModal';
import Button from '../../common/Button';
import HeaderContainer from '../../../containers/header/HeaderContainer';

export default function ModalContainer({
  onTheme,
  onPublish,
  onChangeEmoji,
  tempEmoji,
  post,
}) {
  const [firstModal, setFirstModal] = useState(false);

  const handleFirstModal = async () => {
    if (firstModal) {
      alert('테마가 생성되는 중입니다. 잠시만 기다려주세요');

      setFirstModal(false);
    } else if (firstModal === false) {
      setFirstModal(!firstModal);
      await onTheme(); // 1. 이거 확인
    }
  };

  return (
    <>
      <HeaderContainer />
      <Button $done="true" onClick={handleFirstModal}>
        저장
      </Button>
      {firstModal && (
        <ImageModal
          themes={[post.url1, post.url2, post.url3]}
          onPublish={onPublish}
          onChange={onChangeEmoji}
          tempEmoji={tempEmoji}
        />
      )}
    </>
  );
}
