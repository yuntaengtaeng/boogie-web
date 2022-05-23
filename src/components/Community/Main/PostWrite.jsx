import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { WHITE } from '../../../constants/color';
import { VscEdit } from 'react-icons/vsc';

import LoginModal from '../../Login/LoginModal';

const Wrap = styled.div`
  box-sizing: border-box;
  padding: 1.875rem;
  border: 1px solid #e1e2e3;
  background-color: ${WHITE};
  display: flex;
  align-items: center;
`;

const Box = styled.div`
  box-sizing: border-box;
  flex: 1 1;
  height: 3.5rem;
  padding: 0rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid #e1e2e3;
  background-color: #fff;
  cursor: pointer;
  color: #333;
  font-size: 1rem;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostWrite = () => {
  const navigate = useNavigate();
  const { email } = useSelector((state) => state.user);
  const [isShowingLoginModal, setIsShowingLoginModal] = useState(false);
  const isLoggiend = !!email;

  const movePostWrite = useCallback(() => {
    if (!isLoggiend) {
      setIsShowingLoginModal(true);
      return;
    }

    navigate('/community/add');
  }, [isLoggiend, navigate]);

  const closeLoginModal = useCallback(() => {
    setIsShowingLoginModal(false);
  }, []);

  const successCallback = useCallback(() => {
    setIsShowingLoginModal(false);
  }, []);

  return (
    <Wrap>
      {isShowingLoginModal && (
        <LoginModal
          successCallback={successCallback}
          onCloseHandler={closeLoginModal}
        />
      )}
      <Box onClick={movePostWrite}>
        커리어와 라이프스타일에 대해 자유롭게 이야기 해주세요!
        <VscEdit size={24}></VscEdit>
      </Box>
    </Wrap>
  );
};

export default PostWrite;
