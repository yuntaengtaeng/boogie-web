import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import NondisclosurePage from '../../components/Profile/NondisclosurePage';
import ProfileInformation from '../../components/Profile/ProfileInformation';
import ProfileIntroduction from '../../components/Profile/ProfileIntroduction';
import AwardsAccolades from '../../components/Profile/AwardsAccolades';
import LinkInformation from '../../components/Profile/LinkInformation';
import Block from '../../components/Ui/Block';
import Button from '../../components/Ui/Button';

import { WHITE } from '../../constants/color';

import uiSlce from '../../slices/ui';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 6.25rem 9.375rem;
  @media all and (max-width: 479px) {
    width: 80%;
    padding: 0;
    margin: 3rem auto;
    margin-bottom: 5rem;
    height: fit-content;
  }
`;

const ButtonSpan = styled.span`
  display: flex;
  justify-content: center;

  @media all and (max-width: 479px) {
    margin-top: 0.5rem;
  }
`;

const SubmitButton = styled(Button)`
  height: 3rem;
  font-size: 1rem;
  width: 10rem;

  @media all and (max-width: 479px) {
    height: 2.5rem;
    font-size: 0.8rem;
    width: 100vw;
  }
`;

const StyledBlock = styled(Block)`
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 4rem;
  left: 0;
  background-color: ${WHITE};
  box-shadow: 0 -4px 3px rgba(0, 0, 0, 0.12), 0 4px 3px rgba(0, 0, 0, 0.24);
  display: flex;
  align-items: center;
  justify-content: space-around;

  @media all and (max-width: 479px) {
    height: fit-content;
    flex-direction: column;
  }
`;

const StyledBlockLeft = styled.div`
  display: flex;
  align-items: center;

  @media all and (max-width: 479px) {
    margin-top: 0.5rem;
  }

  div {
    display: flex;
    align-items: center;
  }

  span {
    margin-left: 0.4rem;
  }

  p {
    margin-left: 0.4rem;
    font-size: 0.8rem;
    font-weight: 500;
    @media all and (max-width: 479px) {
      line-height: 1rem;
      word-break: keep-all;
    }
  }
  progress {
    height: 2rem;
    @media all and (max-width: 479px) {
      width: 35vw;
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState({});
  const [isProfileShownPermit, setIsProfileShownPermit] = useState(false);
  const [requestComplete, setRequestComplete] = useState(false);

  const renameKeys = (arr = []) => {
    const rename = arr.map(({ id, name }) => ({
      value: id,
      name,
    }));
    return rename;
  };

  const setProfileDataState = (profileInfo) => {
    if (!!profileInfo.positions) {
      profileInfo.positions = renameKeys(profileInfo.positions);
    }

    if (!!profileInfo.technologies) {
      profileInfo.technologies = renameKeys(profileInfo.technologies);
    }

    setProfileData(profileInfo);

    const checkProfileShownPermit = (() => {
      if (profileInfo.isNotStudent) {
        return true;
      } else if (profileInfo.isMe || profileInfo.isOpen) {
        return true;
      } else {
        return false;
      }
    })();

    setIsProfileShownPermit(checkProfileShownPermit);
  };

  useEffect(() => {
    const getProfileData = async () => {
      dispatch(uiSlce.actions.showLoading());
      try {
        const {
          data: { profileInfo },
        } = await axios.get(`api/profile?id=${id}`, {
          headers: {
            authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          },
        });

        setProfileDataState(profileInfo);
      } catch (e) {
        alert(e.message);
      } finally {
        setRequestComplete(true);
        dispatch(uiSlce.actions.hideLoading());
      }
    };
    getProfileData();
  }, [accessToken, dispatch, id]);

  const onProfileInfoHandler = (e) => {
    const clone = { ...profileData };

    if (e.profileImage !== null) {
      clone.image = e.profileImage;
    }

    clone.positions = e.selectedJob;
    clone.technologies = e.selectedTchnl;

    setProfileData(clone);
  };

  const onIntroductionHandler = (e) => {
    const clone = { ...profileData };
    clone.introduction = e;

    setProfileData(clone);
  };

  const onAwardsHandler = (e) => {
    const clone = { ...profileData };
    clone.awards = e;

    setProfileData(clone);
  };

  const onLinkInformationHandler = (e) => {
    const clone = { ...profileData };
    clone.links = e;

    setProfileData(clone);
  };

  const onHandlerSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const cloneData = { ...profileData };

    cloneData.positions = cloneData.positions.map((v) => v.value);
    cloneData.technologies = cloneData.technologies.map((v) => v.value);

    Object.keys(cloneData).forEach((v) => {
      const key = `${v}`;
      const value = Array.isArray(cloneData[`${v}`])
        ? JSON.stringify(cloneData[`${v}`])
        : cloneData[`${v}`];

      formData.append(key, value);
    });

    dispatch(uiSlce.actions.showLoading());
    try {
      const {
        data: { profileInfo },
      } = await axios.put('api/profile', formData, {
        headers: {
          authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setProfileDataState(profileInfo);
    } catch (e) {
      alert(e.message);
    } finally {
      dispatch(uiSlce.actions.hideLoading());
    }
  };

  const wrap = (() => {
    if (!requestComplete) {
      return null;
    } else {
      if (!isProfileShownPermit) {
        return <NondisclosurePage></NondisclosurePage>;
      } else {
        return (
          <StyledForm onSubmit={onHandlerSubmit}>
            <ProfileInformation
              info={profileData}
              onProfileInfoHandler={onProfileInfoHandler}
            ></ProfileInformation>

            {!profileData.isNotStudent && (
              <>
                <ProfileIntroduction
                  introduction={profileData.introduction}
                  onIntroductionHandler={onIntroductionHandler}
                  isMe={profileData.isMe}
                ></ProfileIntroduction>
                <AwardsAccolades
                  awards={profileData.awards}
                  onAwardsHandler={onAwardsHandler}
                  isMe={profileData.isMe}
                ></AwardsAccolades>
                <LinkInformation
                  link={profileData.links}
                  onLinkInformationHandler={onLinkInformationHandler}
                  isMe={profileData.isMe}
                ></LinkInformation>
                <StyledBlock>
                  <StyledBlockLeft>
                    <div>
                      <progress
                        id="progress"
                        value={profileData.profileScore}
                        min="0"
                        max="100"
                      ></progress>
                      <span>{profileData.profileScore}%</span>
                    </div>
                    <p>💪 완성도가 높을 수록 회사에서 더 관심을 가져요!</p>
                  </StyledBlockLeft>
                  {profileData.isMe && (
                    <ButtonSpan>
                      <SubmitButton
                        type="submit"
                        disabled={Object.keys(profileData) === 0}
                      >
                        작성 완료
                      </SubmitButton>
                    </ButtonSpan>
                  )}
                </StyledBlock>
              </>
            )}
          </StyledForm>
        );
      }
    }
  })();

  return <>{wrap}</>;
};

export default Detail;
