import React, { useEffect } from 'react';
import styled from 'styled-components';
import { VscClose } from 'react-icons/vsc';
import { WHITE } from '../../../constants/color';
import OutLineButton from '../../Ui/OutLineButton';

const ViewerDiv = styled.div``;

const Wrap = styled.div`
  position: fixed;
  z-index: 100;
  background-color: black;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  margin-left: auto;
  margin-top: 1rem;
`;

const Bottom = styled.div`
  display: inline-flex;
  margin-left: auto;
  margin-bottom: 1rem;
`;

const Button = styled(OutLineButton)`
  background-color: transparent;
  color: white;
  font-size: 3rem;
`;

const MobilePdfViewer = ({ children, onClose, previousPage, nextPage }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <Wrap>
      <Header>
        <VscClose
          size={48}
          color={WHITE}
          onClick={() => {
            onClose();
          }}
        />
      </Header>
      <ViewerDiv>{children}</ViewerDiv>
      <Bottom>
        <Button onClick={() => previousPage()}>&lt;</Button>
        <Button onClick={() => nextPage()}>&gt;</Button>
      </Bottom>
    </Wrap>
  );
};

export default MobilePdfViewer;
