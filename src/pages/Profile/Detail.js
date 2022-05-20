import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import NondisclosurePage from '../../components/Profile/NondisclosurePage';
import ProfileFInformation from '../../components/Profile/ProfileFInformation';
import ProfileIntroduction from '../../components/Profile/ProfileIntroduction';
import AwardsAccolades from '../../components/Profile/AwardsAccolades';
import LinkInformation from '../../components/Profile/LinkInformation';
import Button from '../../components/Ui/Button';
import uiSlce from '../../slices/ui';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 6.25rem 9.375rem;
`;

const ButtonSpan = styled.span`
  display: flex;
  justify-content: center;
`;

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState({});
  const [isSatisfied, setIsSatisfied] = useState(true);

  useEffect(() => {
    const renameKeys = (arr = []) => {
      const rename = arr.map(({ id, name }) => ({
        value: id,
        name,
      }));
      return rename;
    };

    const getProfileDate = async () => {
      dispatch(uiSlce.actions.showLoading());
      try {
        const response = await axios.get(`api/profile?id=${id}`, {
          headers: {
            authorization: accessToken,
          },
        });

        response.data.profileInfo.positions = renameKeys(
          response.data.profileInfo.positions
        );

        response.data.profileInfo.technologies = renameKeys(
          response.data.profileInfo.technologies
        );

        setProfileData(response.data.profileInfo);
        setIsSatisfied(
          !(response.data.profileInfo.isMe || response.data.profileInfo.isOpen)
        );
      } catch (e) {
        alert(e.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    };
    getProfileDate();
  }, [accessToken, dispatch, id]);

  const onProfileInfoHandler = (e) => {
    const clone = { ...profileData };

    if (e.profileImage !== null) {
      clone.image = e.profileImage;
    }

    clone.positions = e.selectedJob.map((v) => {
      return v.value;
    });

    clone.technologies = e.selectedTchnl.map((v) => {
      return v.value;
    });
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

    console.log(profileData);

    Object.keys(profileData).forEach((v) => {
      const key = `${v}`;
      const value = Array.isArray(profileData[`${v}`])
        ? JSON.stringify(profileData[`${v}`])
        : profileData[`${v}`];
      console.log(v);
      console.log(value);
      formData.append(key, value);
    });

    dispatch(uiSlce.actions.showLoading());
    try {
      await axios.patch('api/profile', formData, {
        headers: {
          authorization: accessToken,
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (e) {
      alert(e.message);
    } finally {
      dispatch(uiSlce.actions.hideLoading());
    }
  };

  return (
    <>
      {isSatisfied ? (
        <NondisclosurePage></NondisclosurePage>
      ) : (
        <StyledForm onSubmit={onHandlerSubmit}>
          <ProfileFInformation
            info={profileData}
            onProfileInfoHandler={onProfileInfoHandler}
          ></ProfileFInformation>

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

          {profileData.isMe && (
            <ButtonSpan>
              <Button type="submit" disabled={Object.keys(profileData) === 0}>
                적용
              </Button>
            </ButtonSpan>
          )}
        </StyledForm>
      )}
    </>
  );
};

export default Detail;
