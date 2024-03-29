import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from '../../Ui/Card/Card';
import { GRAY } from '../../../constants/color';
import Tooltip from '../../Ui/Tooltip';
import HoverTransform from '../../Ui/HoverTransform';

const IMAGE_MAX_LENGTH = 3;

const StyledTechnologyStackDiv = styled.div`
  display: flex;
  align-items: flex-end;
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
  var hoverItem = '';
  for (let i = 0; i < technologyStacks.length; i++) {
    if (!!technologyStacks[i]) {
      if (i < IMAGE_MAX_LENGTH) {
        technologyStack.push(
          <StyledTechnologyDiv key={i}>
            <StyledImg
              alt={technologyStacks[i]}
              src={
                process.env.PUBLIC_URL +
                `/asset/stack/${technologyStacks[i]}.png`
              }
            />
            <p style={{ fontSize: '0.625rem' }}>{technologyStacks[i]}</p>
          </StyledTechnologyDiv>
        );
      } else {
        if (i !== technologyStacks.length - 1) {
          hoverItem += `${technologyStacks[i]}, `;
        } else {
          hoverItem += `${technologyStacks[i]}`;
        }
      }
    }
  }
  return (
    <HoverTransform>
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
              {etc > 0 && (
                <h5 style={{ margin: '0' }}>
                  <Tooltip
                    tooltipStyle={{ marginTop: '2rem', padding: '0.5rem' }}
                    message={hoverItem}
                  >
                    +{etc}
                  </Tooltip>
                </h5>
              )}
            </StyledTechnologyStackDiv>
          )}
          <StyledLookupP>
            <>{lookup}</>
          </StyledLookupP>
        </StyledContainerDiv>
      </Card>
    </HoverTransform>
  );
};

MainCardPreview.propTypes = {
  technologyStacks: PropTypes.array,
  title: PropTypes.string,
  description: PropTypes.string,
  lookup: PropTypes.number,
};

export default MainCardPreview;
