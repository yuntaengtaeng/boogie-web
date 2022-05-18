import React, { useState, useCallback, useEffect } from 'react';
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
  const [profileDate, setProfileDate] = useState({});
  const [changedData, setChangedData] = useState({});
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

        setProfileDate(response.data.profileInfo);
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
  }, []);

  const comparison = useCallback((arr, compareArr) => {
    let isDifferent = arr?.length !== compareArr?.length;

    if (!isDifferent) {
      arr.map((e) => {
        const find = compareArr.find((v) => v === e);
        if (!find) {
          return (isDifferent = true);
        }
        return false;
      });
    }
    return isDifferent;
  }, []);

  const onProfileInfoHandler = (e) => {
    const clone = changedData;

    if (e.profileImage) {
      clone.image = e.profileImage;
    } else if (clone.image) {
      delete clone.image;
    }

    if (comparison(e.selectedJob, profileDate.positions)) {
      clone.positions = e.selectedJob.map((v) => {
        return v.value;
      });
    } else if (clone.positions) {
      delete clone.positions;
    }

    if (comparison(e.selectedTchnl, profileDate.technologies)) {
      clone.technologies = e.selectedTchnl.map((v) => {
        return v.value;
      });
    } else if (clone.technologies) {
      delete clone.technologies;
    }
    setChangedData(clone);
  };

  const onIntroductionHandler = (e) => {
    const clone = changedData;

    if (e !== profileDate.introduction) {
      clone.introduction = e;
    } else if (clone.introduction) {
      delete clone.introduction;
    }

    setChangedData(clone);
  };

  const onAwardsHandler = (e) => {
    const clone = changedData;

    if (comparison(e, profileDate.awards)) {
      clone.awards = e;
    } else if (clone.awards) {
      delete clone.awards;
    }

    setChangedData(clone);
  };

  const onLinkInformationHandler = (e) => {
    const clone = changedData;

    if (comparison(e, profileDate.links)) {
      clone.links = e;
    } else if (clone.introduction) {
      delete clone.introduction;
    }

    setChangedData(clone);
  };

  const onHandlerSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(changedData).length !== 0) {
      const formData = new FormData();

      Object.keys(changedData).forEach((v) => {
        const key = `${v}`;
        const value = Array.isArray(changedData[`${v}`])
          ? JSON.stringify(changedData[`${v}`])
          : changedData[`${v}`];

        formData.append(key, value);
      });

      const patchProfileInfo = async () => {
        dispatch(uiSlce.actions.showLoading());
        try {
          const resfones = await axios.patch('api/profile', formData, {
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

      patchProfileInfo();
    }
  };

  return (
    <>
      {isSatisfied ? (
        <NondisclosurePage></NondisclosurePage>
      ) : (
        <StyledForm onSubmit={onHandlerSubmit}>
          <ProfileFInformation
            info={profileDate}
            onProfileInfoHandler={onProfileInfoHandler}
          ></ProfileFInformation>

          <ProfileIntroduction
            introduction={profileDate.introduction}
            onIntroductionHandler={onIntroductionHandler}
            isMe={profileDate.isMe}
          ></ProfileIntroduction>

          <AwardsAccolades
            awards={profileDate.awards}
            onAwardsHandler={onAwardsHandler}
            isMe={profileDate.isMe}
          ></AwardsAccolades>

          <LinkInformation
            link={profileDate.links}
            onLinkInformationHandler={onLinkInformationHandler}
            isMe={profileDate.isMe}
          ></LinkInformation>

          {profileDate.isMe && (
            <ButtonSpan>
              <Button type="submit" disabled={Object.keys(changedData) === 0}>
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
