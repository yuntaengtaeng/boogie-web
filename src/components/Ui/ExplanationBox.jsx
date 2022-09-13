import styled from 'styled-components';

const StyledDiv = styled.ul`
  background-color: #f3f9fe;
  font-size: 0.8rem;
  width: 100%;
  list-style-type: disc;
  list-style-position: inside;
  line-height: 2rem;
`;

const StyledLi = styled.li`
  padding: 1rem;

  @media all and (max-width: 479px) {
    padding: 0.2rem;
  }
`;

const ExplanationBox = ({ arr }) => {
  return (
    <StyledDiv>
      {arr.length !== 0 && arr.map((v, i) => <StyledLi key={i}>{v}</StyledLi>)}
    </StyledDiv>
  );
};

export default ExplanationBox;
