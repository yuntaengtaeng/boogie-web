import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CardPreview from '../../Ui/Card/CardPreview';

import GridCardPreview from '../../Ui/Layout/GridCardPreview';
import axios from 'axios';
import { useJobState } from './Context';
import { useDispatch } from 'react-redux';
import uiSlce from '../../../slices/ui';

const JobPostingGroup = () => {
  const [list, setList] = useState([]);

  const { options } = useJobState();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const getJobPostingList = async () => {
    const { region, position } = options;

    const regionQueries = region.map(({ value }) => `region=${value}`);
    const positionQueries = position.map(({ value }) => `position=${value}`);
    const queries = [...regionQueries, ...positionQueries].join('&');
    let URL = 'api/employment/list';
    if (!!queries) {
      URL += `?${queries}`;
    }

    dispatch(uiSlce.actions.showLoading());

    try {
      const {
        data: { jobPostingList },
      } = await axios.get(URL);

      setList(jobPostingList);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
        return;
      }
      alert(error.message);
    } finally {
      dispatch(uiSlce.actions.hideLoading());
    }
  };

  useEffect(() => {
    getJobPostingList();
  }, [options.position, options.region]);

  return (
    <div>
      <GridCardPreview>
        {list.map((item) => (
          <CardPreview
            onClick={() => {
              navigate(`/jobposting/detail/${item.id}`);
            }}
            key={item.id}
            src={item.image}
            title={item.companyName}
            description={`${item.region} · ${item.position}`}
            viewCount={item.viewCount}
          />
        ))}
      </GridCardPreview>
    </div>
  );
};

export default JobPostingGroup;
