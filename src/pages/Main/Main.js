import React from 'react';

import MainContext from '../../components/Main/Main/MainContext';
import Inner from '../../components/Main/Main/Inner';

const Main = () => {
  return (
    <MainContext>
      <Inner></Inner>
    </MainContext>
  );
};

export default Main;
