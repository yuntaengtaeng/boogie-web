import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { BLACK } from '../../../constants/color';
import MainCardPreview from './MainCardPreview';
import uiSlce from '../../../slices/ui';

import GridCardPreview from '../../Ui/Layout/GridCardPreview';

import { useMainState } from './MainContext';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${BLACK};
`;

const MainCardList = () => {
  const dispatch = useDispatch();
  const { options } = useMainState();
  const { name, plattform, technology, classId, year } = options;
  const [cardInfo, setCardInfo] = useState([]);

  useEffect(() => {
    const getMainCardInfo = async () => {
      const plattformQureys = plattform.map(
        ({ value }) => `plattform=${value}`
      );
      const technologyQureys = technology.map(
        ({ value }) => `technology=${value}`
      );

      const queries = [...plattformQureys, ...technologyQureys].join('&');

      let URL = `api/senier-project/list?year=${year.getFullYear()}`;

      if (!!name) {
        URL += `&name=${name}`;
      }

      if (Object.keys(classId).length !== 0) {
        URL += `&classId=${classId.value}`;
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
  }, [classId, dispatch, name, options, plattform, technology, year]);
  return (
    <GridCardPreview>
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
    </GridCardPreview>
  );
};

export default MainCardList;
