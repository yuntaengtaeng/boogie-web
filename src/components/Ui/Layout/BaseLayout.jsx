import React from 'react';
import styled from 'styled-components';

const Layout = styled.section`
  width: 100vw;
  min-height: calc(100vh - 3.5rem);
`;

const BaseLayout = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default BaseLayout;
