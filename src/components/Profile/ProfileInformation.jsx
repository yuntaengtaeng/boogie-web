import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GRAY } from '../../constants/color';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import uiSlice from '../../slices/ui';

import AddProfileImage from './AddProfileImage';
import SelectGroub from './SelectGroub';
import ToogleButton from '../Ui/ToogleButton';
import Line from '../Ui/Line';
import Button from '../Ui/Button';

import { arrayToDropdownData } from '../../Utills/common';
import useGetCategory from '../../hooks/useGetCategory';
import ChangeNickNameModal from './ChangeNickNameModal';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media all and (max-width: 479px) {
    width: 80vw;
  }
`;

const NickNameDiv = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 2rem 0;
  @media all and (max-width: 479px) {
    flex-wrap: wrap;
  }
`;

const StyledTitle = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 3rem;
`;

const StyledSpan = styled.span`
  display: flex;

  @media all and (max-width: 479px) {
    flex-direction: column;
  }
`;

const Span = styled.span`
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;

  @media all and (max-width: 479px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const StyledCenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5rem;

  @media all and (max-width: 479px) {
    font-size: 1rem;
    margin-left: 2rem;
  }
`;

const StyledRightDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  @media all and (max-width: 479px) {
    margin: 0;
  }
`;

const StyledP = styled.p`
  font-size: 1.5rem;
  margin-right: 1rem;

  @media all and (max-width: 479px) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const InfoBlock = styled.div`
  display: inline-flex;
  @media all and (max-width: 479px) {
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
  }
`;

const ProfileInformation = ({
  showModal,
  hideModal,
  isShowingModal,
  info,
  onProfileInfoHandler,
}) => {
  const dispatch = useDispatch();

  const {
    image,
    nickname,
    id,
    positions,
    technologies,
    isMe,
    isOpen,
    isNotStudent,
  } = info;
  const { accessToken } = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState(image || null);
  const [isOn, setIsOn] = useState(isOpen);
  const [selectedJob, setSelectedJob] = useState(positions || []);
  const [selectedTchnl, setSelectedTchn] = useState(technologies || []);
  const technologyList = arrayToDropdownData(useGetCategory('technology'));
  const positionList = arrayToDropdownData(useGetCategory('job'));

  const onAddImageHandler = (date) => {
    setProfileImage(date);
  };

  const onJobItemHandler = (date) => {
    const find = selectedJob.find((element) => element.value === date.value);
    if (!find) {
      const item = [...selectedJob, date];
      setSelectedJob(item);
    } else {
      alert('중복입니다.');
    }
  };

  const onTchnlItemHandler = (date) => {
    const find = selectedTchnl.find((element) => element.value === date.value);
    if (!find) {
      const item = [...selectedTchnl, date];
      setSelectedTchn(item);
    } else {
      alert('중복입니다.');
    }
  };

  const patchOpenInformation = async (date) => {
    const body = {
      willOpenInformation: date,
    };

    dispatch(uiSlice.actions.showLoading());

    try {
      const response = await axios.patch(`api/profile/open`, body, {
        headers: {
          authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
        },
      });
      setIsOn(response.data.isOpen);
    } catch (e) {
      alert(e.response.message);
    } finally {
      dispatch(uiSlice.actions.hideLoading());
    }
  };

  const onPositionDeletHandler = (e) => {
    const filter = selectedJob.filter((v) => v !== e);
    setSelectedJob(filter);
  };

  const onTechnologieDeletHandler = (e) => {
    const filter = selectedTchnl.filter((v) => v !== e);
    setSelectedTchn(filter);
  };

  useEffect(() => {
    const item = {
      profileImage,
      selectedJob,
      selectedTchnl,
    };
    onProfileInfoHandler(item);
  }, [profileImage, selectedJob, selectedTchnl]);

  return (
    <StyledDiv>
      <StyledTitle>프로필</StyledTitle>
      <StyledSpan>
        <InfoBlock>
          <AddProfileImage
            image={profileImage}
            onAddImageHandler={onAddImageHandler}
            isMe={isMe}
          ></AddProfileImage>
          <StyledCenterDiv>
            <NickNameDiv>
              <StyledP>{nickname}</StyledP>
              {isMe && (
                <Button
                  onClick={() => {
                    showModal();
                  }}
                >
                  닉네임 변경
                </Button>
              )}
            </NickNameDiv>
            <StyledP>{id}</StyledP>
          </StyledCenterDiv>
        </InfoBlock>
        <StyledRightDiv>
          {!isNotStudent && (
            <>
              <SelectGroub
                name="직무"
                onDeleteHandler={onPositionDeletHandler}
                selectedItems={selectedJob}
                onSelectItemHandler={onJobItemHandler}
                options={positionList}
                isMe={isMe}
              ></SelectGroub>
              <SelectGroub
                name="기술"
                onDeleteHandler={onTechnologieDeletHandler}
                selectedItems={selectedTchnl}
                onSelectItemHandler={onTchnlItemHandler}
                options={technologyList}
                isMe={isMe}
              ></SelectGroub>
            </>
          )}
          {isMe && (
            <>
              <Span>
                <StyledP style={{ marginRight: '3rem' }}>프로필 공개</StyledP>
                <ToogleButton
                  size={4}
                  isOn={isOn}
                  onClickHandler={patchOpenInformation}
                ></ToogleButton>
              </Span>
              <p style={{ color: `${GRAY}` }}>
                프로필을 공개하지 않으면 기업에서 확인할 수 없습니다.
              </p>
            </>
          )}
        </StyledRightDiv>
      </StyledSpan>
      <Line styled={{ margin: '1rem 0' }} />
      {isShowingModal && (
        <ChangeNickNameModal hideModal={hideModal}></ChangeNickNameModal>
      )}
    </StyledDiv>
  );
};

export default ProfileInformation;
