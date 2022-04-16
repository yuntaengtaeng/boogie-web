import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from './Card';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledImg = styled.img`
  width: 140px;
  height: 180px;
  margin-bottom: 24px;
`;

const StyledDescriptionP = styled.p`
  width: 500px;
  line-height: 24px;
  word-break: keep-all;
  white-space: pre-line;
  padding: 0px 16px;
  margin: 0 16px;
`;

const CardProfile = ({ profileImg, name, description, turn }) => {
  return (
    <Card style={{ padding: '40px 24px', display: 'flex' }}>
      {turn % 2 === 0 || <StyledDescriptionP>{description}</StyledDescriptionP>}
      <StyledDiv>
        <StyledImg src={profileImg}></StyledImg>
        <h4>{name}</h4>
      </StyledDiv>
      {turn % 2 !== 0 || <StyledDescriptionP>{description}</StyledDescriptionP>}
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
