import React from 'react';
import styled from 'styled-components';

import Title from './Title';
import FilterModal from './FilterModal';
import VerticalSpace from '../../Ui/Layout/VerticalSpace';
import JobPostingGroup from './JobPostingGroup';

import { useJobState } from './Context';

const Wrap = styled.section`
  width: 80%;
  margin: 6rem auto;
`;

const Inner = () => {
  const { isModalShowing } = useJobState();

  return (
    <>
      {isModalShowing && <FilterModal />}
      <Wrap>
        <Title />
        <VerticalSpace size="5rem" />
        <JobPostingGroup />
      </Wrap>
    </>
  );
};

export default Inner;
