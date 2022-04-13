import React, { useEffect, useState } from 'react';
import Modal from '../../Ui/Modal/Modal';
import Header from '../../Ui/Modal/Header';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const CountText = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const StyledLi = styled.li`
  margin-bottom: 0.6rem;
`;

const ApplcantsModal = ({ onClose }) => {
  const { accessToken } = useSelector((state) => state.user);
  const { id } = useParams();
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

  return (
    <Modal>
      <Header onClose={onClose} />
      <CountText>현재 지원한 인원 총 {count} 명</CountText>
      <ul>
        {applcants.map((applcant) => (
          <StyledLi key={applcant}>{applcant}</StyledLi>
        ))}
      </ul>
    </Modal>
  );
};

export default ApplcantsModal;
