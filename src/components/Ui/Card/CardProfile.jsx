import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from './Card';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 16px;
`;

const StyledImg = styled.img`
  width: 140px;
  height: 180px;
  margin-bottom: 24px;
`;

const StyledDescriptionP = styled.p`
  width: 500px;
  word-break: keep-all;
  white-space: pre-line;
  padding: 0px 16px;
  margin: 0;
`;

const CardProfile = ({ profileImg, name, description }) => {
  return (
    <Card style={{ padding: '40px 24px', display: 'flex' }}>
      <StyledDiv>
        <StyledImg {...profileImg}></StyledImg>
        <h4>{name}</h4>
      </StyledDiv>
      <StyledDescriptionP>{description}</StyledDescriptionP>
    </Card>
  );
};

CardProfile.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
};

export default CardProfile;
