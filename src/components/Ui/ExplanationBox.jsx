import styled from 'styled-components';

const StyledDiv = styled.div`
  background-color: #f3f9fe;
  font-size: 1rem;
  width: 100%;
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
