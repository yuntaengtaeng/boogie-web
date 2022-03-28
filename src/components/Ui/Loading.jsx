import React from 'react';
import styled, { keyframes } from 'styled-components';
import ReactDOM from 'react-dom';
import { PRIMARY } from '../../constants/color';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const Scrim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = styled.div`
  height: 5rem;
  width: 5rem;
  border: 6px solid #fff;
  border-right-color: ${PRIMARY};
  border-top-color: ${PRIMARY};
  border-radius: 100%;
  animation: ${spin} 800ms infinite linear;
`;

const Loading = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <Scrim>
          <Loader />
        </Scrim>,
        document.getElementById('loading-root')
      )}
    </>
  );
};

export default Loading;
