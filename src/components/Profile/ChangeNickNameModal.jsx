import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Modal from '../Ui/Modal/Modal';
import Header from '../Ui/Modal/Header';
import Input from '../Ui/Input';
import Button from '../Ui/Button';
import axios from 'axios';

const StyledFilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  max-height: 80vh;

  @media all and (max-width: 479px) {
    width: 80vw;
  }

  .box {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .box::-webkit-scrollbar {
    display: none;
  }
`;

const StyledInput = styled(Input)`
  width: 20rem;
  height: 3rem;
  border-radius: 0.5rem;
  margin-bottom: 3rem;

  @media all and (max-width: 479px) {
    width: 100%;
  }
`;

const StyledText = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 3rem;

  @media all and (max-width: 479px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const StyledButton = styled(Button)`
  font-size: 1rem;
  padding: 1.5rem 1.2rem;
  border-radius: 0.5rem;
`;

const StyledSpan = styled.span`
  display: flex;
`;

const ChangeNickNameModal = ({ hideModal }) => {
  const { accessToken } = useSelector((state) => state.user);

  const [changeNickname, setChangeNickname] = useState('');
  const [postNickname, setPostNickname] = useState('');
  const [isSatisfied, setIsSatisfied] = useState(true);
  const [isDuplicateCheck, setIsDuplicateCheck] = useState(false);

  const DuplicateCheck = async () => {
    const nickname = changeNickname;

    try {
      const response = await axios.post(`api/profile/nickname/exists`, {
        nickname,
      });

      if (!response.data.isExists) {
        setPostNickname(nickname);
      }

      setIsDuplicateCheck(response.data.isExists);
      setIsSatisfied(response.data.isExists);
    } catch (e) {
      alert(e.response.message);
    }
  };

  const onCreate = async () => {
    const newNickname = postNickname;

    try {
      const response = await axios.patch(
        `api/profile/nickname`,

        { newNickname },
        {
          headers: {
            authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          },
        }
      );
    } catch (e) {
      alert(e.response.message);
    } finally {
      hideModal();
    }
  };

  return (
    <>
      <Modal>
        <Header
          onClose={() => {
            hideModal();
          }}
        ></Header>
        <StyledFilterDiv>
          <StyledText style={{ marginBottom: '1rem' }}>이름</StyledText>
          <StyledSpan>
            <StyledInput
              type="text"
              onChange={(e) => {
                setChangeNickname(e.target.value);
              }}
            ></StyledInput>
            <StyledButton
              onClick={() => {
                DuplicateCheck();
              }}
            >
              중복확인
            </StyledButton>
          </StyledSpan>
          {isDuplicateCheck && (
            <StyledText style={{ color: 'red' }}>
              중복된 닉네임입니다.
            </StyledText>
          )}

          <StyledButton
            onClick={() => {
              onCreate();
            }}
            style={{ width: '100%', marginTop: '2rem' }}
            disabled={isSatisfied}
          >
            생성
          </StyledButton>
        </StyledFilterDiv>
      </Modal>
    </>
  );
};

export default ChangeNickNameModal;
