import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../../Ui/Modal/Modal';
import Header from '../../Ui/Modal/Header';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProfileImage from '../../Ui/ProfileImage';

const CountText = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StyledLi = styled.li`
  margin-bottom: 0.6rem;
  display: flex;
  align-items: center;
`;

const ApplcantsModal = ({ onClose }) => {
  const { accessToken } = useSelector((state) => state.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const [applcants, setApplcants] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getApplcants = async () => {
      try {
        const {
          data: { applicantList = [], applicantCount },
        } = await axios.get(`api/employment/applicant/list?id=${id}`, {
          headers: {
            authorization: `${process.env.REACT_APP_JWT_KEY} ${accessToken}`,
          },
        });

        setApplcants(applicantList);
        setCount(applicantCount);
      } catch (error) {
        console.log(error.response);
      }
    };

    getApplcants();
  }, [accessToken, id]);

  const moveProfile = useCallback(
    (id) => {
      navigate(`/profile/detail/${id}`);
    },
    [navigate]
  );

  return (
    <Modal>
      <Header onClose={onClose} />
      <CountText>현재 지원한 인원 총 {count} 명</CountText>
      <ul>
        {applcants.map((applcant) => (
          <StyledLi
            key={applcant.id}
            onClick={moveProfile.bind(this, applcant.id)}
          >
            <ProfileImage size={32} src={applcant.profileImage} />
            {applcant.id}
          </StyledLi>
        ))}
      </ul>
    </Modal>
  );
};

export default ApplcantsModal;
