import React, { useCallback, useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import FilterModal from '../../components/Jobposting/Main/FilterModal';
import Title from '../../components/Jobposting/Main/Title';
import JobPostingGroup from '../../components/Jobposting/Main/JobPostingGroup';
import axios from 'axios';
import uiSlce from '../../slices/ui';
import { useDispatch } from 'react-redux';

import DeletOutLineButton from '../../components/Ui/DeletOutLineButton';

const Wrap = styled.section`
  width: 80%;
  margin: 6rem auto;
`;

const JobPosting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowingFilterModal, setIsShowingFilterModal] = useState(false);
  const [filterOptionsData, setFilterOptionsData] = useState({});
  const [jobPostingDataList, setJobPostingDataList] = useState([]);
  // const [selectedPosition, setSelectedPosition] = useState([]);
  // const [selectedRegion, setSelectedRegion] = useState([]);

  const moveAddJobPosting = useCallback(() => {
    navigate('/jobposting/add');
  }, [navigate]);

  const showFilterModal = useCallback(() => {
    setIsShowingFilterModal(true);
  }, []);

  const hideFilterModal = useCallback(() => {
    setIsShowingFilterModal(false);
  }, []);

  const requestJobPostionSearch = useCallback(
    async ({ position = [], region = [] } = {}) => {
      console.log(position);
      console.log(region);
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

        setJobPostingDataList(jobPostingList);
        setFilterOptionsData({
          position,
          region: region,
        });
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message);
          return;
        }

        alert(error.message);
      } finally {
        dispatch(uiSlce.actions.hideLoading());
      }
    },
    [dispatch]
  );

  const filterSubmit = useCallback(
    (options) => {
      requestJobPostionSearch(options);
      hideFilterModal();
    },
    [hideFilterModal, requestJobPostionSearch]
  );

  const onDeleteHandler = useCallback(
    ({ key, value }) => {
      let { position, region } = { ...filterOptionsData };

      if (key === 'position') {
        position = position.filter((option) => option.value !== value);
      } else if (key === 'region') {
        region = region.filter((option) => option.value !== value);
      }

      requestJobPostionSearch({ position, region });
    },
    [filterOptionsData, requestJobPostionSearch]
  );

  useEffect(() => {
    requestJobPostionSearch();
  }, []);

  return (
    <Wrap>
      <Title
        leftButtonOnClickHandler={showFilterModal}
        rightButtonOnClickHandler={moveAddJobPosting}
        filterOptions={filterOptionsData}
        onDeleteHandler={onDeleteHandler}
      />
      <JobPostingGroup
        style={{ marginTop: '5rem' }}
        list={jobPostingDataList}
      />
      {isShowingFilterModal && (
        <FilterModal
          onClose={hideFilterModal}
          onSubmit={filterSubmit}
          options={filterOptionsData}
        />
      )}
    </Wrap>
  );
};

export default JobPosting;
