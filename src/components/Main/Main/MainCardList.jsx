import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { BLACK } from '../../../constants/color';
import MainCardPreview from './MainCardPreview';
import uiSlce from '../../../slices/ui';

const StyledCardDiv = styled.div`
  display: grid;
  justify-items: center;
  gap: 1rem;
  grid-template-columns: repeat(auto-Fill, minmax(18.75rem, 1fr));
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${BLACK};
`;

const MainCardList = ({ filterOption, year }) => {
  const dispatch = useDispatch();
  const [cardInfo, setCardInfo] = useState([]);

  useEffect(() => {
    const getMainCardInfo = async () => {
      const plattformQureys = filterOption.plattform.map(
        ({ value }) => `plattform=${value}`
      );
      const technologyQureys = filterOption.technology.map(
        ({ value }) => `technology=${value}`
      );

      const queries = [...plattformQureys, ...technologyQureys].join('&');

      let URL = `api/senier-project/list?year=${year.getFullYear()}`;

      if (!!filterOption.name) {
        URL += `&name=${filterOption.name}`;
      }

      if (Object.keys(filterOption.classId).length !== 0) {
        URL += `&classId=${filterOption.classId.value}`;
      }

      if (!!queries) {
        URL += `&${queries}`;
      }

      dispatch(uiSlce.actions.showLoading());

      try {
        const mainCardInfo = await axios.get(URL);
        setCardInfo(mainCardInfo.data.senierProjectList);
      } catch (e) {
        alert(e.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    };
    getMainCardInfo();
  }, [dispatch, filterOption, year]);
  return (
    <StyledCardDiv>
      {cardInfo.map((v) => (
        <StyledLink
          to={`/main/detail/${v.id}`}
          style={{ marginBottom: '20px' }}
          key={v.id}
        >
          <MainCardPreview
            title={v.groupName}
            description={v.teamMember}
            platform={v.plattform}
            lookup={v.viewCount}
            technologyStacks={v.technology}
          ></MainCardPreview>
        </StyledLink>
      ))}
    </StyledCardDiv>
  );
};

export default MainCardList;
