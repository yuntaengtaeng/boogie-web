import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from './Card';
import useDeviceDetect from '../../../hooks/useDeviceDetect';

const StyledBlock = styled.div`
  @media all and (max-width: 479px) {
    display: flex;
    flex-direction: column;
    width: fit-content;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImg = styled.img`
  width: 140px;
  height: 180px;
  margin-bottom: 16px;

  @media all and (max-width: 479px) {
    width: 147px;
    height: 188px;
    margin: 16px 20px;
  }
`;

const StyledDescriptionP = styled.p`
  width: 500px;
  line-height: 24px;
  word-break: keep-all;
  white-space: pre-line;
  padding: 16px 16px;
  margin: 0 16px;
  @media all and (max-width: 479px) {
    width: 11rem;
    padding: 0;
    margin: 0;
  }
`;

const StyledButton = styled.button`
  border: 0;
  outline: 0;
  background-color: transparent;
  text-align: center;
  margin: 12px 0;
  font-size: 0.7rem;
`;

const CardProfile = ({ profileImg, name, description, turn }) => {
  const { isMobile } = useDeviceDetect();
  const [fold, setFold] = useState({
    isOpen: false,
    text: '펼치기',
  });

  const click = () => {
    const clone = {
      isOpen: !fold.isOpen,
      text: fold.isOpen ? '펼치기' : '접기',
    };
    setFold(clone);
  };
  return (
    <Card style={{ padding: '0px 24px', display: 'flex' }}>
      {isMobile || turn % 2 === 0 || (
        <StyledDescriptionP>{description}</StyledDescriptionP>
      )}
      <StyledBlock>
        <StyledDiv>
          <StyledImg src={profileImg}></StyledImg>
          <h4 style={{ marginBottom: '20px' }}>{name}</h4>
        </StyledDiv>
        {isMobile && (
          <>
            {fold.isOpen && (
              <StyledDescriptionP>{description}</StyledDescriptionP>
            )}
            <StyledButton onClick={click}>{fold.text}</StyledButton>
          </>
        )}
      </StyledBlock>
      {isMobile || turn % 2 !== 0 || (
        <StyledDescriptionP>{description}</StyledDescriptionP>
      )}
    </Card>
  );
};

CardProfile.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  profileImg: PropTypes.string,
  turn: PropTypes.number,
};

CardProfile.defaultProps = {
  turn: 0,
};

export default CardProfile;
