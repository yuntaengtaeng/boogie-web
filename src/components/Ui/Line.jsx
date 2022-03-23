import styled from 'styled-components';
import { LINE_COLOR } from '../../constants/color';

const StyledHr = styled.hr`
  color: ${LINE_COLOR};
`;

const Line = ({ styled }) => {
  return <StyledHr style={styled} />;
};

export default Line;
