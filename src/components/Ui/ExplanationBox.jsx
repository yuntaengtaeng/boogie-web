import styled from 'styled-components';

const StyledDiv = styled.ul`
  background-color: #f3f9fe;
  font-size: 1rem;
  width: 100%;
  list-style-type: disc;
  list-style-position: inside;
`;

const StyledLi = styled.li`
  padding: 1rem;
`;

const ExplanationBox = ({ arr }) => {
  return (
    <StyledDiv>
      {arr.length !== 0 && arr.map((v, i) => <StyledLi key={i}>{v}</StyledLi>)}
    </StyledDiv>
  );
};

export default ExplanationBox;
