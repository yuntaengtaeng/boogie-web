import React from 'react';

import Context from '../../components/Jobposting/Main/Context';
import Inner from '../../components/Jobposting/Main/Inner';

const JobPosting = () => {
  return (
    <Context>
      <Inner />
    </Context>
  );
};

export default JobPosting;
