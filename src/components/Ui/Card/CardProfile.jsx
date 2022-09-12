import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from './Card';
import useDeviceDetect from '../../../hooks/useDeviceDetect';

const ProfileCard = styled(Card)`
  @media all and (max-width: 479px) {
    padding: 0;
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
`;

const CardProfile = ({ profileImg, name, description, turn }) => {
  const { isMobile } = useDeviceDetect();
  return (
    <ProfileCard style={{ padding: '0px 24px', display: 'flex' }}>
      {isMobile || turn % 2 === 0 || (
        <StyledDescriptionP>{description}</StyledDescriptionP>
      )}
      <StyledDiv>
        <StyledImg src={profileImg}></StyledImg>
        <h4 style={{ marginBottom: '16px' }}>{name}</h4>
      </StyledDiv>
      {isMobile || turn % 2 !== 0 || (
        <StyledDescriptionP>{description}</StyledDescriptionP>
      )}
    </ProfileCard>
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
