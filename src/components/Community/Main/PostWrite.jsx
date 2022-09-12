import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { WHITE, PRIMARY } from '../../../constants/color';
import { VscEdit } from 'react-icons/vsc';

import LoginModal from '../../Login/LoginModal';

import useDeviceDetect from '../../../hooks/useDeviceDetect';

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

const FixedIconWrap = styled.div`
  position: fixed;
  z-index: 5;
  background-color: ${PRIMARY};
  border-radius: 50%;
  padding: 0.6rem;
  top: 80%;
  left: 80%;
`;

const PostWrite = () => {
  const { isMobile } = useDeviceDetect();

  const navigate = useNavigate();
  const { email } = useSelector((state) => state.user);
  const [isShowingLoginModal, setIsShowingLoginModal] = useState(false);
  const isLoggiend = !!email;

  const movePostWrite = useCallback(() => {
    console.log(isLoggiend);
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
    <>
      {isShowingLoginModal && (
        <LoginModal
          successCallback={successCallback}
          onCloseHandler={closeLoginModal}
        />
      )}
      {isMobile ? (
        <FixedIconWrap onClick={movePostWrite}>
          <VscEdit size={24} color={WHITE}></VscEdit>
        </FixedIconWrap>
      ) : (
        <Wrap>
          <Box onClick={movePostWrite}>
            커리어와 라이프스타일에 대해 자유롭게 이야기 해주세요!
            <VscEdit size={24}></VscEdit>
          </Box>
        </Wrap>
      )}
    </>
  );
};

export default PostWrite;
