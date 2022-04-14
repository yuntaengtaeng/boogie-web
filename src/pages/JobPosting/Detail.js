import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button, { BUTTON_THEME } from '../../components/Ui/Button';
import { useParams } from 'react-router-dom';
import ApplcantsModal from '../../components/Jobposting/Detail/ApplcantsModal';
import axios from 'axios';
import Line from '../../components/Ui/Line';
import { useSelector } from 'react-redux';

import Map from '../../components/Jobposting/Detail/Map';
import uiSlice from '../../slices/ui';
import { useDispatch } from 'react-redux';
import { GRAY } from '../../constants/color';
import Precautions from '../../components/Jobposting/Detail/Precautions';

const Container = styled.section`
  width: 60%;
  box-sizing: border-box;
  margin: 0 auto;
  padding-top: 5rem;
  padding-bottom: 5rem;

  @media all and (max-width: 479px) {
    width: 80%;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Sub = styled.div`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: ${GRAY};
  * {
    margin-right: 1rem;
  }

  *:not(:first-child) {
    padding-left: 1rem;
    border-left: 1px solid ${GRAY};
  }
`;

const Pre = styled.pre`
  margin-top: 2rem;
  margin-bottom: 1rem;
  white-space: break-spaces;
`;

const AddressInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  @media all and (max-width: 479px) {
    flex-direction: column;
  }
`;

const AddressInfoRight = styled.div`
  margin-left: 1rem;

  button {
    margin-top: 1rem;
  }

  @media all and (max-width: 479px) {
    margin-left: 0rem;

    button {
      margin: 1rem auto 0 auto;
    }
  }
`;

const DeadlineInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  span:first-child {
    margin-right: 1rem;
  }
`;

const MapContainer = styled.div`
  width: 50vw;
  height: 20vw;

  @media all and (max-width: 479px) {
    width: 100%;
    height: 30vw;
    margin-bottom: 1rem;
  }
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  button:first-child {
    margin-right: 1rem;
  }
`;

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { accessToken, email } = useSelector((state) => state.user);
  const isLoggiend = !!email;

  const [jobPostingData, setJobPostingData] = useState({});
  const [isShowingApplicantsModal, setIsShowingApplicantsModal] =
    useState(false);

  useEffect(() => {
    const getDetail = async () => {
      dispatch(uiSlice.actions.showLoading());

      try {
        const { data } = await axios.get(`api/employment?id=${id}`);
        setJobPostingData(data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
          return;
        }

        alert(error.message);
      } finally {
        dispatch(uiSlice.actions.hideLoading());
      }
    };

    getDetail();
  }, [dispatch, id]);

  const getCompanySupportList = useCallback(() => {
    setIsShowingApplicantsModal(true);
  }, []);

  const requestCompanySupport = useCallback(async () => {
    const body = {
      id,
    };

    dispatch(uiSlice.actions.showLoading());

    try {
      const { data: isApplied } = await axios.post(
        'api/employment/applicant',
        body,
        {
          headers: {
            authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          },
        }
      );

      if (isApplied) {
        alert('지원이 완료되었습니다.');
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return;
      }

      alert(error.message);
    } finally {
      dispatch(uiSlice.actions.hideLoading());
    }
  }, [accessToken, dispatch, id]);

  const address = JSON.parse(jobPostingData?.addressInformation || '{}');
  const marker = {
    lng: address.x,
    lat: address.y,
  };

  const findingWay = useCallback(() => {
    window.open(
      `https://map.kakao.com/link/to/${address.address},${address.y},${address.x}`,
      '_blank'
    );
  }, [address]);

  return (
    <Container>
      <Img src={jobPostingData.image} alt="회사 로고" />
      <Title>{jobPostingData.title}</Title>
      <Sub>
        <span>{jobPostingData.companyName}</span>
        <span>{jobPostingData.region}</span>
        <span>{jobPostingData.position}</span>
      </Sub>
      <Line />
      <Pre>{jobPostingData.content}</Pre>
      <div>
        <Line />
        <AddressInfo>
          <MapContainer>
            <Map
              style={{ width: '100%', height: '100%' }}
              marker={marker}
            ></Map>
          </MapContainer>
          <AddressInfoRight>
            <span>{address.address}</span>
            <Button theme={BUTTON_THEME.PRIMARY} onClick={findingWay}>
              길찾기
            </Button>
          </AddressInfoRight>
        </AddressInfo>
        <Line />
        <DeadlineInfo>
          <span>마감일자</span>
          <span>{jobPostingData.deadline}</span>
        </DeadlineInfo>
      </div>
      {isLoggiend && (
        <Bottom>
          <Button
            theme={BUTTON_THEME.PRIMARY}
            type="button"
            onClick={requestCompanySupport}
          >
            지원하기
          </Button>
          <Button
            theme={BUTTON_THEME.SECONDARY}
            type="button"
            onClick={getCompanySupportList}
          >
            지원한 사람 보기
          </Button>
        </Bottom>
      )}
      {isShowingApplicantsModal && (
        <ApplcantsModal
          onClose={() => {
            setIsShowingApplicantsModal(false);
          }}
        />
      )}

      <Precautions companyName={jobPostingData.companyName} />
    </Container>
  );
};

export default Detail;
