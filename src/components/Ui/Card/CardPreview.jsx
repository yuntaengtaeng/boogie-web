import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from './Card';
import Chip from '../Chip';
import { GRAY } from '../../../constants/color';

const IMAGE_MAX_LENGTH = 2;

const StyledTechnologyStackDiv = styled.div`
  display: flex;
  align-items: center;

  > div > div {
    margin-right: 4px;
  }
`;

const StyledContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
  flex: 1;
`;

const StyledImg = styled.img`
  height: 150px;
  margin-bottom: 8px;
  box-sizing: border-box;
`;

const StyledDescriptionP = styled.p`
  word-break: keep-all;
  font-size: 10px;
  margin-bottom: 16px;
`;

const StyledLookupDiv = styled.div`
  font-size: 8px;
  text-align: right;
  margin-top: auto;
  color: ${GRAY};
`;

const CardPreview = ({
  previewImg,
  title,
  description,
  technologyStacks,
  lookup,
}) => {
  const technologyStack = [];
  const etc = technologyStacks.length - IMAGE_MAX_LENGTH;
  for (let i = 0; i < IMAGE_MAX_LENGTH; i++) {
    if (!!technologyStacks[i]) {
      technologyStack.push(<Chip key={i}>{technologyStacks[i]}</Chip>);
    }
  }
  return (
    <Card
      style={{
        height: '280px',
        padding: '16px 0px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <StyledImg {...previewImg}></StyledImg>
      <StyledContainerDiv>
        <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>{title}</div>
        <StyledDescriptionP>{description}</StyledDescriptionP>
        {technologyStack.length !== 0 && (
          <StyledTechnologyStackDiv>
            <div>{technologyStack}</div>
            {etc > 0 && <h5 style={{ margin: '0' }}>+{etc}</h5>}
          </StyledTechnologyStackDiv>
        )}
        <StyledLookupDiv>{lookup}</StyledLookupDiv>
      </StyledContainerDiv>
    </Card>
  );
};

CardPreview.propTypes = {
  technologyStacks: PropTypes.array,
  title: PropTypes.string,
  description: PropTypes.string,
  lookup: PropTypes.number,
};

export default CardPreview;
