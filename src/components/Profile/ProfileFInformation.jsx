import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GRAY } from '../../constants/color';
import axios from 'axios';
import { useSelector } from 'react-redux';

import AddProfileImage from './AddProfileImage';
import SelectGroub from './SelectGroub';
import ToogleButton from '../Ui/ToogleButton';
import Line from '../Ui/Line';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitle = styled.p`
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const StyledSpan = styled.span`
  display: flex;
`;

const Span = styled.span`
  display: inline-flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledCenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5rem;
`;

const StyledRightDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
`;

const StyledP = styled.p`
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const ProfileFInformation = ({ info, onProfileInfoHandler }) => {
  const { image, nickname, id, positions, technologies, isMe, isOpen } = info;
  const { accessToken } = useSelector((state) => state.user);
  const [profileImage, setProfileImage] = useState(image !== '' ? image : null);
  const [selectedJob, setSelectedJob] = useState(
    Array.isArray(positions) ? positions : []
  );
  const [selectedTchnl, setSelectedTchn] = useState(
    Array.isArray(technologies) ? technologies : []
  );
  const [isOn, setIsOn] = useState(isOpen);

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

    try {
      const response = await axios.patch(`api/profile/open`, body, {
        headers: {
          authorization: accessToken,
        },
      });
      setIsOn(date);
    } catch (e) {
      alert(e.message);
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
  }, [selectedJob, selectedTchnl, profileImage]);
  return (
    <StyledDiv>
      <StyledTitle>프로필</StyledTitle>
      <StyledSpan>
        <AddProfileImage
          image={image}
          onAddImageHandler={onAddImageHandler}
          isMe={isMe}
        ></AddProfileImage>
        <StyledCenterDiv>
          <StyledP style={{ margin: '2rem 0' }}>{nickname}</StyledP>
          <StyledP>{id}</StyledP>
        </StyledCenterDiv>
        <StyledRightDiv>
          <SelectGroub
            onTechnologieDeletHandler={onTechnologieDeletHandler}
            onPositionDeletHandler={onPositionDeletHandler}
            selectedTchnl={selectedTchnl}
            selectedJob={selectedJob}
            onTchnlItemHandler={onTchnlItemHandler}
            onJobItemHandler={onJobItemHandler}
            isMe={isMe}
          ></SelectGroub>
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
    </StyledDiv>
  );
};

export default ProfileFInformation;
