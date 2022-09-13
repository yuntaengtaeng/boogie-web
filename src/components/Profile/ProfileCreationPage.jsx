import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../Ui/Button';
import Modal from '../Ui/Modal/Modal';
import Header from '../Ui/Modal/Header';
import Input from '../Ui/Input';

import axios from 'axios';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 6.25rem 9.375rem;

  @media all and (max-width: 479px) {
    width: 80vw;
    padding: 0;
    margin: 3rem auto;
    margin-bottom: 5rem;
    height: fit-content;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const StyledTitle = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 3rem;
`;

const StyledMainText = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 3rem;

  @media all and (max-width: 479px) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
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

const CreateButton = styled(Button)`
  font-size: 1rem;
  padding: 1.5rem 1.2rem;
  border-radius: 0.5rem;
`;

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
  width: 30rem;
  height: 3rem;
  border-radius: 0.5rem;
  margin-bottom: 3rem;

  @media all and (max-width: 479px) {
    width: 100%;
  }
`;

const ProfileCreationPage = ({ setHasProfile }) => {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [name, setName] = useState('');
  const [uniId, setUniId] = useState('');

  const { accessToken } = useSelector((state) => state.user);

  const showModal = () => {
    setIsShowingModal(true);
  };

  const hideModal = () => {
    setIsShowingModal(false);
  };

  const onCreate = async () => {
    try {
      const response = await axios.post(
        `api/profile`,
        {
          name,
          uniId,
        },
        {
          headers: {
            authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          },
        }
      );

      setHasProfile(response.data.isPost);
    } catch (e) {
      alert(e.message);
    } finally {
      hideModal();
    }
  };

  const isSatisfied = name === '' && uniId === '';

  return (
    <>
      <Wrap>
        <StyledTitle>프로필</StyledTitle>
        <StyledDiv>
          <StyledMainText>아직 프로필이 존재하지 않습니다.</StyledMainText>
          <StyledText>버튼을 눌러 프로필을 생성해보세요.</StyledText>
          <CreateButton
            onClick={() => {
              showModal();
            }}
          >
            프로필 생성하기
          </CreateButton>
        </StyledDiv>
      </Wrap>
      {isShowingModal && (
        <Modal>
          <Header
            onClose={() => {
              hideModal();
            }}
          ></Header>
          <StyledFilterDiv>
            <StyledText style={{ marginBottom: '1rem' }}>이름</StyledText>
            <StyledInput
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></StyledInput>
            <StyledText style={{ marginBottom: '1rem' }}>학번</StyledText>
            <StyledInput
              type="number"
              value={uniId}
              onChange={(e) => {
                setUniId(e.target.value);
              }}
            ></StyledInput>
            <CreateButton
              onClick={() => {
                onCreate();
              }}
              style={{ width: '100%', marginTop: '2rem' }}
              disabled={isSatisfied}
            >
              생성
            </CreateButton>
          </StyledFilterDiv>
        </Modal>
      )}
    </>
  );
};

export default ProfileCreationPage;
