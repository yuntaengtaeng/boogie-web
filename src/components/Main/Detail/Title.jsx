import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const StyledTitleP = styled.p`
  font-size: 2.5rem;
  margin-bottom: 3.125rem;
`;

const Title = () => {
  const { id } = useParams();
  const [groupName, setGroupName] = useState('');
  const [year, setYearName] = useState('');
  useEffect(() => {
    const getGroupName = async () => {
      try {
        const response = await axios.get(
          `api/senier-project/detail/group?id=${id}`
        );
        setGroupName(response.data.groupName);
        setYearName(response.data.year);
      } catch (e) {
        alert(e.message);
      }
    };
    getGroupName();
  }, []);

  return (
    <>
      <StyledTitleP>
        {year} {groupName}
      </StyledTitleP>
    </>
  );
};

export default Title;
