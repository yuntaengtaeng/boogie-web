import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from '../../Ui/Card/Card';
import { GRAY } from '../../../constants/color';
import { AiFillEye } from 'react-icons/ai';

const IMAGE_MAX_LENGTH = 3;

const StyledTechnologyStackDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 20px;
`;

const StyledContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  flex: 1;
`;

const StyledImg = styled.img`
  box-sizing: border-box;
  margin-bottom: 8px;
`;

const StyledTitleP = styled.p`
  margin: 16px 0;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

const StyledDescriptionP = styled.p`
  word-break: keep-all;
  font-size: 12px;
  margin: 16px 0;
  text-align: center;
  color: ${GRAY};
`;

const StyledSpan = styled.span`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: ${GRAY};
`;

const StyledLookupP = styled.p`
  font-size: 16px;
  text-align: right;
  margin-top: 30px;
  margin-right: 8px;
  color: ${GRAY};
`;

const StyledTechnologyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainCardPreview = ({
  title,
  description,
  platform,
  technologyStacks,
  lookup,
}) => {
  const technologyStack = [];
  const etc = technologyStacks.length - IMAGE_MAX_LENGTH;
  for (let i = 0; i < IMAGE_MAX_LENGTH; i++) {
    if (!!technologyStacks[i]) {
      technologyStack.push(
        <StyledTechnologyDiv key={i}>
          <StyledImg
            alt={technologyStacks[i]}
            src={
              process.env.PUBLIC_URL + `/asset/stack/${technologyStacks[i]}.png`
            }
          />
          <p style={{ fontSize: '10px' }}>{technologyStacks[i]}</p>
        </StyledTechnologyDiv>
      );
    }
  }
  return (
    <Card
      style={{
        padding: '16px 0px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <StyledContainerDiv>
        <StyledTitleP>{title}</StyledTitleP>
        <StyledDescriptionP>{description}</StyledDescriptionP>
        <StyledSpan>{platform}</StyledSpan>
        {technologyStack.length !== 0 && (
          <StyledTechnologyStackDiv>
            {technologyStack}
            {etc > 0 && <h5 style={{ margin: '0' }}>+{etc}</h5>}
          </StyledTechnologyStackDiv>
        )}
        <StyledLookupP>
          <>
            <AiFillEye style={{ paddingRight: '4px' }} />
            {lookup}
          </>
        </StyledLookupP>
      </StyledContainerDiv>
    </Card>
  );
};

MainCardPreview.propTypes = {
  technologyStacks: PropTypes.array,
  title: PropTypes.string,
  description: PropTypes.string,
  lookup: PropTypes.number,
};

export default MainCardPreview;
